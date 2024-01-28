import twilio from 'twilio';
require('dotenv').config()
export default function sendMessage(phone:string, message: string) {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    const numenMe = <string>process.env.TWILIO_NUMBER
    const client = twilio(accountSid, token);
    client.messages.create({
            body: message,
            from: numenMe,
            to: `+228${phone}`,
        }).then((message) =>
            console.log(message.sid)
        )
        .catch((error) => {
            console.log(error);
        });
}
