const path = require('path')
const CronJob= require('cron').CronJob
const ejs = require('ejs')
const { EMAIL, EMAIL_PASSWORD } = require('./../../config/variables') 
const mailer = require('nodemailer')
const User = require('./../models/User')
const { API_URL } = require('./../../config/variables')

const emailJob =  new CronJob('*/10 * * * * *', async () => {

    const users = (await User.find()).filter((user)=>!user.receivedEmail);

    if(users.length === 0) return 


    for (const user of users) {

        console.log(`Trying to send Email to ${user.email}`)

            const transporter = mailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, 
                auth: {
                    user: EMAIL,
                    pass: EMAIL_PASSWORD
                }
            });
            
            ejs.renderFile(path.join(__dirname, '../views/', "emailTemplate.ejs"), {confirmationUrl: `${API_URL}/email/signup/${user._id}`}, (err, data) => {

                if (err)  return  console.error(err);

                transporter.sendMail({
                    from: EMAIL,
                    to: user.email,
                    subject: 'Confirme seu Email',
                    text: 'Código de verificação',
                    html: String(data)
                }, async  (error, info) =>{

                    if(user.emailAttempts >= 5 ) return await User.deleteOne({ _id: user._id });
    
                    if (error) {

                      console.error(error);

                      user.emailAttempts++

                      return  await user.save()

                    }
                       user.receivedEmail = true
    
                       console.log(`Email sent to ${user.email}`)
    
                       await user.save()
                })

                
            });

            
        
    }
})
module.exports =  emailJob 