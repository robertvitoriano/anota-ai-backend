const { EMAIL, EMAIL_PASSWORD } = require('./../../config/variables') 

const CronJob= require('cron').CronJob
const mailer = require('nodemailer')
const User = require('./../models/User')
const emailJob =  new CronJob('* * * * *', async () => {
    console.log(`CronJob Email Working...`)

    const users = (await User.find()).filter((user)=>!user.receivedEmail);


    for (const user of users) {
        console.log(`CronJob Email checking user ${user.name}`)

        console.log(`Trying to send Email to ${user.email}`)

            const transporter = mailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: EMAIL,
                    pass: EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: EMAIL,
                to: user.email,
                subject: 'Confirme seu Email',
                text: 'Código de verificação'
            };

            transporter.sendMail(mailOptions, async  (error, info) =>{
                if (error) return  console.log(error);
                
                   console.log('Email sent: ' + info.response);
                   user.receivedEmail = true
                   await user.save()
            })
        
    }
})
module.exports =  emailJob 