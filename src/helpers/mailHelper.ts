export interface MailHelperInterface {
  subject: string;
  body: string;
}

export interface MailHelper {
  sendMail: (data: MailHelperInterface) => Promise<void>;
};