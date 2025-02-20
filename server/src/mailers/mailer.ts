import { CreateEmailResponse } from "resend";
import { config } from "../config/app.config";
import { resend } from "./resendClient";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const getFromEmail = (): string => {
  if (config.NODE_ENV === "development") {
    return config.MAILER_SENDER;
  }

  if (!config.EMAIL_SENDER) {
    throw new Error(
      "EMAIL_SENDER environment variable is not set in production."
    );
  }

  return config.EMAIL_SENDER; // This is the email address that will be used to send the email
  //#TODO: Setup custom domain with valid email address
};

const getToEmail = (to: string | string[]): string[] => {
  if (config.NODE_ENV === "development") {
    return [config.MAILER_RECEIVER];
  }

  if (Array.isArray(to)) {
    return to; // This is the email address that will receive the email
  }

  return [to]; // This is the email address that will receive the email
};

export const sendEmail = async ({
  to,
  from,
  subject,
  text,
  html,
}: Params): Promise<CreateEmailResponse> => {
  return await resend.emails.send({
    from: from || getFromEmail(),
    to: getToEmail(to),
    text,
    subject,
    html,
  });
};
