import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: "test1.test2.01@bk.ru",
      pass: "4v3XxqFgRSMykuV0wwsV",
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
  })



  export const sendMail = async (mail: string, html: string) => {
    try {
      console.log(mail)
      let result = await transporter.sendMail({
          from: 'test1.test2.01@bk.ru',
          to: mail,
          subject: 'Message from Cloud Disk',
          html: html,
        })

      return result
    } catch(e) {
      return false
    }
  }
  