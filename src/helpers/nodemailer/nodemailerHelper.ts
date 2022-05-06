import nodemailer from 'nodemailer';
import { MailHelperInterface, MailHelper } from "../mailHelper";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e5681ddd5df5fe",
    pass: "24fc51727928dd"
  }
});

export class NodemailerHelper implements MailHelper {
  async sendMail({ subject, body }: MailHelperInterface){
      await transport.sendMail({
        from: 'Luke Feedget <contato@feedget.com>',
        to: 'Lucas Alves <lucasporfirioa@gmail.com>',
        subject: subject,
        html: body,
      })
  };
}