
'use client';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  reload,
  deleteUser,
  User as FirebaseUser
} from 'firebase/auth';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  limit,
  serverTimestamp,
  runTransaction
} from 'firebase/firestore';

/**
 * Validates username availability and format.
 */
export async function checkUsernameAvailability(db: Firestore, username: string) {
  const formatRegex = /^[a-z0-9_]{3,20}$/;
  if (!formatRegex.test(username)) {
    return { available: false, reason: "invalid_format" };
  }

  const docRef = doc(db, 'usernames', username.toLowerCase());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { available: false, reason: "taken" };
  }

  return { available: true };
}

/**
 * Validates email availability using the emails lookup collection.
 */
export async function checkEmailAvailability(db: Firestore, email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const docRef = doc(db, 'emails', normalizedEmail);
  
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { available: false, reason: "taken" };
    }
    return { available: true };
  } catch (error) {
    console.error("Email check failed:", error);
    return { available: false, reason: "error" };
  }
}

/**
 * Validates a referral code format and existence.
 */
export async function validateReferralCode(db: Firestore, code: string) {
  const formatRegex = /^GETR-[A-Z0-9]{8}$/;
  if (!formatRegex.test(code.toUpperCase())) {
    return { valid: false, reason: "invalid_format" };
  }

  const codeRef = doc(db, 'referralCodes', code.toUpperCase());
  const codeSnap = await getDoc(codeRef);

  if (!codeSnap.exists()) {
    return { valid: false, reason: "not_found" };
  }

  const referrerUid = codeSnap.data().uid;
  const userRef = doc(db, 'users', referrerUid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().accountStatus !== "active") {
    return { valid: false, reason: "inactive_referrer" };
  }

  const referrerData = userSnap.data();
  return {
    valid: true,
    referrerUid,
    referrerFullName: referrerData.fullName,
    referrerUsername: referrerData.username
  };
}

/**
 * Generates a unique 8-character referral code.
 */
export async function generateUniqueReferralCode(db: Firestore): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded O and I
  let attempts = 0;

  while (attempts < 10) {
    let code = 'GETR-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const codeRef = doc(db, 'referralCodes', code);
    const codeSnap = await getDoc(codeRef);

    if (!codeSnap.exists()) {
      return code;
    }
    attempts++;
  }

  throw new Error("Could not generate a unique referral code after 10 attempts.");
}

/**
 * Atomic user creation.
 * Creates Auth record first, then uses a transaction for Firestore documents.
 */
export async function completeUserCreation(
  auth: Auth,
  db: Firestore,
  userData: {
    email: string;
    password: string;
    fullName: string;
    username: string;
    phone: string;
    referralCode?: string;
    signupIp?: string | null;
    deviceFingerprint?: string | null;
  }
) {
  const normalizedEmail = userData.email.toLowerCase().trim();

  // 1. Pre-checks for uniqueness
  const emailCheck = await checkEmailAvailability(db, normalizedEmail);
  if (!emailCheck.available) throw new Error("email_taken");

  const usernameCheck = await checkUsernameAvailability(db, userData.username);
  if (!usernameCheck.available) throw new Error("username_taken");

  let referrerUid: string | null = null;
  if (userData.referralCode) {
    const refCheck = await validateReferralCode(db, userData.referralCode);
    if (!refCheck.valid) throw new Error("invalid_referral");
    referrerUid = refCheck.referrerUid!;
  }

  // 2. Create Auth User
  const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, userData.password);
  const firebaseUser = userCredential.user;

  // 3. Update Auth Profile
  await updateProfile(firebaseUser, { displayName: userData.fullName });

  // 4. Generate their unique code
  const newUserReferralCode = await generateUniqueReferralCode(db);

  // 5. Atomic Firestore writes using transaction
  await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const usernameRef = doc(db, 'usernames', userData.username.toLowerCase());
    const emailLookupRef = doc(db, 'emails', normalizedEmail);
    const referralCodeRef = doc(db, 'referralCodes', newUserReferralCode);

    transaction.set(userRef, {
      uid: firebaseUser.uid,
      email: normalizedEmail,
      fullName: userData.fullName,
      username: userData.username.toLowerCase(),
      phone: userData.phone,
      referralCode: newUserReferralCode,
      referredBy: userData.referralCode || null,
      bankAccount: null,
      accountStatus: 'pending',
      isActive: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      signupIp: userData.signupIp || null,
      deviceFingerprint: userData.deviceFingerprint || null
    });

    transaction.set(usernameRef, {
      uid: firebaseUser.uid,
      createdAt: serverTimestamp()
    });

    transaction.set(emailLookupRef, {
      uid: firebaseUser.uid,
      createdAt: serverTimestamp()
    });

    transaction.set(referralCodeRef, {
      uid: firebaseUser.uid,
      createdAt: serverTimestamp()
    });
  });

  return {
    uid: firebaseUser.uid,
    email: normalizedEmail,
    username: userData.username,
    referralCode: newUserReferralCode
  };
}

/**
 * Sign in user and check verification status.
 */
export async function signInUser(auth: Auth, db: Firestore, email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      throw new Error("email_not_verified");
    }

    // Update last login
    const userRef = doc(db, 'users', user.uid);
    updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return user;
  } catch (error: any) {
    if (error.message === "email_not_verified") throw error;

    const code = error.code;
    if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
      throw new Error("invalid_credentials");
    }
    if (code === "auth/too-many-requests") {
      throw new Error("too_many_attempts");
    }
    throw error;
  }
}

/**
 * Password reset with enumeration protection.
 */
export async function resetPassword(auth: Auth, email: string) {
  try {
    await sendPasswordResetEmail(auth, email.toLowerCase().trim(), {
      url: `${window.location.origin}/login`
    });
  } catch (error: any) {
    // Silent success if user not found to prevent enumeration
    if (error.code === "auth/user-not-found") return;
    throw error;
  }
}

/**
 * Sends email verification with continue URL back to signup.
 */
export async function sendVerification(user: FirebaseUser) {
  await sendEmailVerification(user, {
    url: `${window.location.origin}/signup`
  });
}

/**
 * Reloads user and checks verification.
 */
export async function isEmailVerified(user: FirebaseUser) {
  await reload(user);
  return user.emailVerified;
}

/**
 * Deletes unverified user for cleanup (e.g. email change flow).
 */
export async function deleteUnverifiedUser(auth: Auth, db: Firestore, user: FirebaseUser) {
  if (user.emailVerified) {
    throw new Error("Cannot delete verified accounts via this flow.");
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const usernameRef = doc(db, 'usernames', data.username.toLowerCase());
    const emailRef = doc(db, 'emails', data.email.toLowerCase());
    const referralCodeRef = doc(db, 'referralCodes', data.referralCode);

    await runTransaction(db, async (transaction) => {
      transaction.delete(userRef);
      transaction.delete(usernameRef);
      transaction.delete(emailRef);
      transaction.delete(referralCodeRef);
    });
  }

  await deleteUser(user);
}

/**
 * Updates bank account details.
 */
export async function updateUserBankAccount(
  db: Firestore,
  uid: string,
  bankData: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  }
) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    bankAccount: {
      ...bankData,
      verifiedAt: serverTimestamp()
    },
    updatedAt: serverTimestamp()
  });
}
