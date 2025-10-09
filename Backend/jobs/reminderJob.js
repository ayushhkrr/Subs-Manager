import cron from "node-cron";
import { Subscription } from "../model/allSchemas.js";

const subsChecker = async () => {
  const reminderDate = new Date();
  reminderDate.setDate(reminderDate.getDate() + 3);
  const startOfDay = new Date(reminderDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(reminderDate);
  endOfDay.setHours(23, 59, 59, 999);

  const renewal = await Subscription.find({renewalDate:{$gte: startOfDay, $lte: endOfDay}}).populate('userId', 'email')
  if (renewal.length === 0){
      console.log('There is nothing to remind today')
  }else{

      for (const subscription of renewal) {
        console.log({'Reminder':`The ${subscription.plan} subscription for user ${subscription.userId.email} is renewing in 3 days.`})
    }  
}
};

export const startReminder = ()=>{
    cron.schedule('0 8 * * *',subsChecker)
}