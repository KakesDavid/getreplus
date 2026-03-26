
'use server';

/**
 * Server Action to securely resolve Nigerian bank accounts via Paystack.
 * This keeps the Secret Key safe on the server.
 */
export async function resolveBankAccount(accountNumber: string, bankCode: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey || secretKey === 'your_paystack_secret_key_here') {
    console.warn("Paystack Secret Key is missing or using placeholder.");
    return { success: false, error: "Payment gateway not configured. Please add your Paystack Secret Key to the .env file." };
  }

  try {
    const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // Ensure fresh data
    });

    const data = await response.json();

    if (data.status === true && data.data) {
      return {
        success: true,
        accountName: data.data.account_name,
      };
    } else {
      return {
        success: false,
        error: data.message || "Could not resolve account details. Please check the account number and bank.",
      };
    }
  } catch (error) {
    console.error("Paystack Resolution Error:", error);
    return {
      success: false,
      error: "Network error during bank verification.",
    };
  }
}
