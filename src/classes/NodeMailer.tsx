import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import SMTPPool from "nodemailer/lib/smtp-pool";
import axios from "axios";
import { TemplateModule } from "@/types";
import { render } from "@react-email/render";
import Mail from "nodemailer/lib/mailer";

interface Config {
  host: string;
  port: number;
  secure: boolean;
  auth: Auth;
}

interface Auth {
  user: string;
  pass: string;
}

export default class NodeMailer {
  config: Config;
  transport: nodemailer.Transporter<SMTPPool.SentMessageInfo>;

  constructor(config: Config) {
    this.config = config;

    this.transport = nodemailer.createTransport({
      pool: true,
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  async sendMail<T = { [key: string]: any }>(
    emailParams: Omit<Mail.Options, "from" | "subject" | "text" | "html">,
    template: string,
    templateParams: T
  ) {
    const { default: Template, subject, preview } = (await import(`../../templates/${template}`)) as TemplateModule;

    const html = render(<Template />);

    return await this.transport.sendMail({
      ...emailParams,
      from: "noreply@unusann.us",
      subject: subject(templateParams),
      text: preview(templateParams),
      html,
    });
  }
}
