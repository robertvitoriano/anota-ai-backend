const CronJob= require('cron').CronJob
const mailer = require('nodemailer')
const User = require('./../models/User')
const emailJob =  new CronJob('* * * * *', async () => {
    console.log(`CronJob Email Working...`)


    const users = await User.find();

    for (const user of users) {
        console.log(`CronJob Email checking user ${user.name}`)

        if (user.receivedEmail === false) {

            console.log(`Trying to send Email to ${user.email}`)

            const transporter = mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Confirme seu Email',
                text: 'Código de verificação'
            };

            transporter.sendMail(mailOptions, async  (error, info) =>{
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    user.receivedEmail = true
                   await user.save()
                }

            })
        }
    }
})
module.exports =  emailJob 