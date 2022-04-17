import path from 'path'
import { CronJob } from 'cron'
import ejs from 'ejs'
import mailer from 'nodemailer'
import User from '../models/User'

const confirmEmailJob = new CronJob('*/10 * * * * *', async () => {

    const users = (await User.find()).filter((user) => !user.receivedEmail);

    if (users.length === 0) return


    for (const user of users) {

        console.log(`Trying to send Email to ${user.email}`)

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
            url: `${process.env.API_URL}/email/signup/${user._id}`,
            text: 'Confirme seu email',
            action: 'Confirmar email'
        }, (err, data) => {

            if (err) return console.error(err);

            transporter.sendMail({
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Confirme seu Email',
                text: 'Código de verificação',
                html: String(data)
            }, async (error, info) => {

                if (user.emailAttempts >= 5) return await User.deleteOne({ _id: user._id });

                if (error) {

                    console.error(error);

                    user.emailAttempts++

                    return await user.save()

                }
                user.receivedEmail = true

                console.log(`Email sent to ${user.email}`)

                await user.save()
            })


        });
    }
})
export { confirmEmailJob }