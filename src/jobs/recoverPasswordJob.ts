import path from 'path'
import { CronJob } from 'cron'
import ejs from 'ejs'
import mailer from 'nodemailer'
import User from '../models/User'

const recoverPasswordJob = new CronJob('*/10 * * * * *', async () => {

  const users = (await User.find()).filter((user) => user.isRecoveringPassword);

  if (users.length === 0) return

  for (const user of users) {

    console.log(`Trying to send recover password email to ${user.email}`)

    const transporter = mailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    ejs.renderFile(path.join(__dirname, '../views/', "emailTemplate.ejs"), {
      url: `${process.env.API_URL}/email/recover/${user._id}`,
      text: 'Recupere sua senha',
      action: 'Recuperar senha'
    }, (err, data) => {

      if (err) return console.error(err);

      transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Recuperar senha',
        text: 'Recupere sua senha',
        html: String(data)
      }, async (error, info) => {

        console.log(`Recover password email sent to ${user.email}`)
        user.isRecoveringPassword = false
        await user.save()
      })
    });
  }
})
export { recoverPasswordJob }