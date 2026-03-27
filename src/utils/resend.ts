import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, fullName: string) {
  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://getreplus.onrender.com';

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to GetrePlus</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0D0D0D;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #111111;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .header {
      background: linear-gradient(135deg, #064E3B 0%, #0D0D0D 100%);
      padding: 40px 32px;
      text-align: center;
      border-bottom: 1px solid rgba(183,134,44,0.2);
    }
    .logo {
      margin-bottom: 16px;
    }
    .logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #B7862C, #92650A);
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    .logo-icon span {
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 24px;
      color: #0D0D0D;
    }
    .logo-text {
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 28px;
      color: #F5F0E8;
      letter-spacing: -0.5px;
    }
    .logo-text span {
      color: #B7862C;
    }
    .content {
      padding: 40px 32px;
      background: #111111;
    }
    h1 {
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 28px;
      color: #F5F0E8;
      margin: 0 0 8px 0;
    }
    .greeting {
      font-size: 16px;
      color: rgba(245,240,232,0.85);
      line-height: 1.5;
      margin-bottom: 28px;
    }
    .highlight {
      color: #B7862C;
    }
    .section-title {
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 20px;
      color: #F5F0E8;
      margin: 32px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(183,134,44,0.3);
      display: inline-block;
    }
    .section-title-sm {
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 18px;
      color: #F5F0E8;
      margin: 24px 0 12px 0;
    }
    .text {
      font-size: 15px;
      color: rgba(245,240,232,0.75);
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .text-strong {
      color: #F5F0E8;
      font-weight: 600;
    }
    .price-card {
      background: rgba(183,134,44,0.06);
      border: 1px solid rgba(183,134,44,0.2);
      border-radius: 16px;
      padding: 20px;
      margin: 20px 0;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .price-row:last-child {
      border-bottom: none;
    }
    .price-name {
      font-weight: 600;
      color: #F5F0E8;
    }
    .price-amount {
      font-family: 'Space Grotesk', monospace;
      font-weight: bold;
      font-size: 18px;
      color: #B7862C;
    }
    .price-desc {
      font-size: 12px;
      color: rgba(245,240,232,0.5);
      margin-top: 4px;
    }
    .steps {
      margin: 20px 0;
      padding-left: 20px;
    }
    .steps li {
      color: rgba(245,240,232,0.75);
      font-size: 14px;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .steps li::marker {
      color: #B7862C;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #B7862C, #92650A);
      color: #0D0D0D;
      font-family: 'Syne', 'Inter', sans-serif;
      font-weight: bold;
      font-size: 15px;
      padding: 14px 28px;
      border-radius: 12px;
      text-decoration: none;
      margin: 20px 0 8px 0;
      box-shadow: 0 4px 20px rgba(183,134,44,0.35);
    }
    .button-link {
      color: #B7862C;
      text-decoration: none;
      font-weight: 500;
    }
    .button-link:hover {
      text-decoration: underline;
    }
    .divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 32px 0 24px 0;
    }
    .footer {
      padding: 24px 32px;
      background: #0D0D0D;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .footer-text {
      font-size: 12px;
      color: rgba(245,240,232,0.4);
      line-height: 1.5;
    }
    .footer-link {
      color: rgba(183,134,44,0.8);
      text-decoration: none;
    }
    .footer-link:hover {
      color: #B7862C;
    }
    .whatsapp-link {
      color: #B7862C;
      text-decoration: none;
      font-weight: 500;
    }
    @media only screen and (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .content {
        padding: 28px 20px;
      }
      .header {
        padding: 32px 20px;
      }
      .footer {
        padding: 20px;
      }
      h1 {
        font-size: 24px;
      }
      .section-title {
        font-size: 18px;
      }
      .button {
        display: block;
        text-align: center;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px 0; background-color: #0D0D0D; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <div class="container" style="max-width: 600px; margin: 0 auto; background: #111111; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07);">
    
    <!-- HEADER WITH G+ LOGO -->
    <div class="header" style="background: linear-gradient(135deg, #064E3B 0%, #0D0D0D 100%); padding: 40px 32px; text-align: center; border-bottom: 1px solid rgba(183,134,44,0.2);">
      <div class="logo" style="margin-bottom: 16px;">
        <div class="logo-icon" style="width: 48px; height: 48px; background: linear-gradient(135deg, #B7862C, #92650A); border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
          <span style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 24px; color: #0D0D0D;">G+</span>
        </div>
        <div class="logo-text" style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 28px; color: #F5F0E8; letter-spacing: -0.5px;">
          Getre<span style="color: #B7862C;">Plus</span>
        </div>
      </div>
    </div>
    
    <!-- CONTENT -->
    <div class="content" style="padding: 40px 32px; background: #111111;">
      
      <h1 style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 28px; color: #F5F0E8; margin: 0 0 8px 0;">Welcome to GetrePlus! 🎉</h1>
      
      <div class="greeting" style="font-size: 16px; color: rgba(245,240,232,0.85); line-height: 1.5; margin-bottom: 28px;">
        Hi ${fullName},
      </div>
      
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        Your account has been successfully created. You're one step away from earning real money every Friday!
      </p>
      
      <!-- WHAT IS GETREPLUS -->
      <div class="section-title" style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 20px; color: #F5F0E8; margin: 32px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(183,134,44,0.3); display: inline-block;">
        🌟 WHAT IS GETREPLUS?
      </div>
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        GetrePlus is Nigeria's easiest way to earn real money by referring friends. Every time someone you refer joins and activates their account, you earn <span class="highlight" style="color: #B7862C;">₦2,500 to ₦7,500</span> — paid directly to your bank account every Friday.
      </p>
      
      <!-- HOW TO UNLOCK REFERRAL CODE -->
      <div class="section-title" style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 20px; color: #F5F0E8; margin: 32px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(183,134,44,0.3); display: inline-block;">
        💰 HOW TO UNLOCK YOUR REFERRAL CODE
      </div>
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        To start earning, you need to activate your account with a one-time fee:
      </p>
      
      <div class="price-card" style="background: rgba(183,134,44,0.06); border: 1px solid rgba(183,134,44,0.2); border-radius: 16px; padding: 20px; margin: 20px 0;">
        <div class="price-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div>
            <div class="price-name" style="font-weight: 600; color: #F5F0E8;">Starter Plan</div>
            <div class="price-desc" style="font-size: 12px; color: rgba(245,240,232,0.5); margin-top: 4px;">Unlock your referral code and start earning</div>
          </div>
          <div class="price-amount" style="font-family: 'Space Grotesk', monospace; font-weight: bold; font-size: 18px; color: #B7862C;">₦2,050</div>
        </div>
        <div class="price-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: none;">
          <div>
            <div class="price-name" style="font-weight: 600; color: #F5F0E8;">Premium Plan</div>
            <div class="price-desc" style="font-size: 12px; color: rgba(245,240,232,0.5); margin-top: 4px;">Unlock referral code + bonus earnings</div>
          </div>
          <div class="price-amount" style="font-family: 'Space Grotesk', monospace; font-weight: bold; font-size: 18px; color: #B7862C;">₦5,100</div>
        </div>
      </div>
      
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        <span class="text-strong" style="color: #F5F0E8; font-weight: 600;">Your referral code will be revealed in your dashboard immediately after activation.</span>
      </p>
      
      <!-- HOW EARNING WORKS -->
      <div class="section-title" style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 20px; color: #F5F0E8; margin: 32px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(183,134,44,0.3); display: inline-block;">
        ⚡ HOW EARNING WORKS
      </div>
      <ul class="steps" style="margin: 20px 0; padding-left: 20px;">
        <li style="color: rgba(245,240,232,0.75); font-size: 14px; margin-bottom: 12px; line-height: 1.5;">Activate your account <span style="color: #F5F0E8;">(one-time fee)</span></li>
        <li style="color: rgba(245,240,232,0.75); font-size: 14px; margin-bottom: 12px; line-height: 1.5;">Share your unique referral code with friends</li>
        <li style="color: rgba(245,240,232,0.75); font-size: 14px; margin-bottom: 12px; line-height: 1.5;">Earn <span style="color: #B7862C;">₦2,500–₦7,500</span> per successful referral</li>
        <li style="color: rgba(245,240,232,0.75); font-size: 14px; margin-bottom: 12px; line-height: 1.5;">Get paid every Friday directly to your bank</li>
      </ul>
      
      <!-- WHAT'S NEXT -->
      <div class="section-title" style="font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 20px; color: #F5F0E8; margin: 32px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(183,134,44,0.3); display: inline-block;">
        📱 WHAT'S NEXT?
      </div>
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        Click the button below to activate your account and start earning:
      </p>
      
      <div style="text-align: center;">
        <a href="${platformUrl}/dashboard?prompt=activate" class="button" style="display: inline-block; background: linear-gradient(135deg, #B7862C, #92650A); color: #0D0D0D; font-family: 'Syne', 'Inter', sans-serif; font-weight: bold; font-size: 15px; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin: 20px 0 8px 0; box-shadow: 0 4px 20px rgba(183,134,44,0.35);">
          ACTIVATE NOW — ₦2,050 or ₦5,100
        </a>
      </div>
      
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px; text-align: center;">
        Or log in to your dashboard at <a href="${platformUrl}/dashboard" class="button-link" style="color: #B7862C; text-decoration: none; font-weight: 500;">${platformUrl}/dashboard</a> to activate anytime.
      </p>
      
      <div class="divider" style="height: 1px; background: rgba(255,255,255,0.08); margin: 32px 0 24px 0;"></div>
      
      <p class="text" style="font-size: 15px; color: rgba(245,240,232,0.75); line-height: 1.6; margin-bottom: 16px;">
        Need help? Reply to this email or chat with us on 
        <a href="https://wa.me/234XXXXXXXXXX" class="whatsapp-link" style="color: #B7862C; text-decoration: none; font-weight: 500;">WhatsApp</a>.
      </p>
      
    </div>
    
    <!-- FOOTER -->
    <div class="footer" style="padding: 24px 32px; background: #0D0D0D; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
      <div class="footer-text" style="font-size: 12px; color: rgba(245,240,232,0.4); line-height: 1.5;">
        © 2025 GetrePlus. All rights reserved.<br>
        You're receiving this because you signed up for GetrePlus.<br>
        <a href="${platformUrl}/unsubscribe" class="footer-link" style="color: rgba(183,134,44,0.8); text-decoration: none;">Unsubscribe</a>
      </div>
    </div>
    
  </div>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'GetrePlus <welcome@getreplus.com>',
      to: email,
      subject: 'Welcome to GetrePlus! 🎉',
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Welcome email sent to:', email);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}