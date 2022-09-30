const nodemailer = require('nodemailer')//libreria qeu nos permite automatizar e l envio de mails
const { google } = require("googleapis") //
const OAuth2 = google.auth.OAuth2

const sendVerification = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({ //metodo de nodemailer "transport"
        service: "gmail",
        auth: {
            user: process.env.USER,
            type: "OAuth2", //autorizacion especifica de google
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'verify account',
        html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK!</a>
            <h3>to confirm!</h3>`
            //controla del verfificador que me controla la cuenta
    }

    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error)
        } else { 
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendVerification