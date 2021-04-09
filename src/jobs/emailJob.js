const cron = require('cron')
const mailer = require('nodemailer')
const User = require('./../models/User')
const emailJob =  new cron.CronJob('*/5 * * * * *', async () => {


    const users = await User.find();

    for (const user of users) {

        if (user.receivedEmail === false) {


            const transporter = mailer.findcreateTransport({
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