import AwsService from "../services/aws";
import logger from "../logger";
import TermiiService from "../utils/termii";

const systemTypes = ["email", "sms"];

const notify = async ({
  email,
  data,
  template,
  notifyBy,
  subject,
  smsObj
}: any) => {
  try {
    if (Array.isArray(notifyBy) && notifyBy.includes(systemTypes[0])) {
      logger.info("sending Email notification...");
      await new AwsService().sendMail({ email, data, template, subject });
      logger.info("Email notification sent ");
    }

    if (
      Array.isArray(notifyBy) &&
      notifyBy.includes(systemTypes[1])
    ) {
      logger.info("sending termii sms notification...");
      await new TermiiService().sendSms(smsObj);
      logger.info("Sms notification sent ");
    }

  } catch (error) {
    logger.error(`notify.util --> notify --> ${error}`);
    throw error;
  }
};

export default notify;
