import { User } from "../interfaces/user";
import nodemailer from "nodemailer"
import nodemailerSendgrid from "nodemailer-sendgrid";



const createTransport = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey:<string> process.env.SENDGRID_API_KEY,
    })
  );

  return transport;
};
export const sendEmail = async (user: User, Message: string) => {
  const transporter = createTransport();
  let info = await transporter.sendMail({
    from: "jaindrissosajsd@gmail.com",
    to: `${user.email}`,
    subject: `Hello ${user.name} `,
    html: `This is your code :    ${Message}`,
  });
  console.log("Message sent: %s", info.messageId);

  return;
};
