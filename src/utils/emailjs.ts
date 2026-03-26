
import emailjs from '@emailjs/browser';

/**
 * Sends a welcome email to the user via EmailJS.
 * This function handles the process silently in the background.
 * 
 * @param fullName - The user's full name
 * @param platformUrl - The URL of the platform (e.g., window.location.origin)
 */
export async function sendWelcomeEmail(fullName: string, platformUrl: string, toEmail: string) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS environment variables are missing. Skipping welcome email.');
    return;
  }

  try {
    // Note: Template fields are specific to your EmailJS account.
    // Based on requirements: fullName and platformUrl are included.
    // We also pass to_email to ensure EmailJS knows who to send it to.
    await emailjs.send(
      serviceId,
      templateId,
      {
        fullName,
        platformUrl,
        to_email: toEmail, // Typically required by EmailJS templates to address the recipient
      },
      publicKey
    );
  } catch (error) {
    // Silent fail as requested - only log to console
    console.error('EmailJS welcome email background process failed:', error);
  }
}
