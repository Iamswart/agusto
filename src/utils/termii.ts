import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { termiiError } from "../error";
import { SmsInterface } from "../interfaces/termii";

export default class TermiiService {
  private baseUrl = "https://api.ng.termii.com";
  private static TERMII_API_KEY = config.termiiSecretKey;
  private static TERMII_SMS_SENDER = config.termiiSender;

  async sendSms(input: SmsInterface) {
    try {
      const requestBody = {
        to: `${input.phone}`,
        from: TermiiService.TERMII_SMS_SENDER,
        sms: input.message,
        type: "plain",
        api_key: TermiiService.TERMII_API_KEY,
        channel: "dnd",
      };
      const axiosResponse: AxiosResponse = await axios.post(
        `${this.baseUrl}/api/sms/send`,
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return axiosResponse.data;
    } catch (error) {
      throw termiiError(error.response?.data?.message || error.message);
    }
  }
}
