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
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        fullName,
        platformUrl,
        to_email: toEmail,
      },
      publicKey
    );
    console.log('Welcome email sent successfully:', result.status, result.text);
  } catch (error: any) {
    // Improved error logging for debugging
    console.error('EmailJS welcome email background process failed:', error?.text || error);
  }
}