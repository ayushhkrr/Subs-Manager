import cron from "node-cron";
import sgMail from "@sendgrid/mail";
import { Subscription } from "../model/allSchemas.js";
import { reminderTemplate } from "../emailTemplate/reminderTemplate.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const subsChecker = async () => {
  try {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 3);
    const startOfDay = new Date(reminderDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(reminderDate);
    endOfDay.setHours(23, 59, 59, 999);

    const renewal = await Subscription.find({
      renewalDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("userId", "email username",);
    if (renewal.length === 0) {
      console.log("There is nothing to remind today");
    } else {
      for (const subscription of renewal) {
        const to = subscription.userId.email;
        const plan = subscription.plan;
        const renewalDate = subscription.renewalDate;

        try {
          await sgMail.send({
            to,
            from: process.env.FROM_EMAIL,
            subject: `Reminder: Your ${plan} subscription renews soon`,
            html: reminderTemplate(subscription.userId.username, plan, renewalDate),
          });

          console.log(`✅ Email sent to ${to} for plan: ${plan}`);
        } catch (err) {
          console.error(`❌ Failed to send email to ${to}:`, err.message);
        }
      }
    }
  } catch (e) {
    console.error("Reminder job error:", e.message);
  }
};

export const startReminder = () => {
  cron.schedule("0 8 * * *", subsChecker);
};
