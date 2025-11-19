export const reminderTemplate = (userName, plan, renewalDate, dashboardUrl) => {
  const clientUrl = dashboardUrl || process.env.CLIENT_URL || 'http://localhost:3000';
  const dashboardLink = `${clientUrl}/dashboard`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f9f9f9;padding:20px;border-radius:10px;max-width:500px;margin:auto;">
      <h2 style="color:#333;text-align:center;">Subscription Reminder 🚀</h2>
      <p style="font-size:15px;color:#555;">
        Hey <strong>${userName}</strong>,
      </p>
      <p style="font-size:15px;color:#555;">
        This is a quick reminder that your <strong>${plan}</strong> subscription will renew on
        <strong>${new Date(renewalDate).toLocaleDateString()}</strong>.
      </p>
      <p style="font-size:15px;color:#555;">
        If you would like to modify or cancel this subscription, please visit your account dashboard before the renewal date.
      </p>
      <div style="text-align:center;margin-top:20px;">
        <a href="${dashboardLink}"
           style="background:#007bff;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">
           Go to Dashboard
        </a>
      </div>
      <p style="font-size:13px;color:#888;text-align:center;margin-top:30px;">
        — The Subs Manager Team
      </p>
    </div>
  `;
};
