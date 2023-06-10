import nodemailer from "nodemailer"

export interface ISendPersonalizadoEmailParams{
    email:string;
    texto:string;
    nome: string;
    assunto: string;
}

class SendPersonalizadoEmailCase {
    async execute( {email,assunto,texto,nome} : ISendPersonalizadoEmailParams ){

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
              pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
            },
        });
        
        const mailOptions = {
            from: 'igorlabakig@gmail.com',
            to:     email,
            subject: assunto,
            html: `
            <div style="font-family: Arial, sans-serif; height: 990px;">
                <table style="width: 100%; height: 100%; background-image: url('https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684606263/onbridge/qqwsl8w6yheuxhh69fzl.jpg'); background-size: cover;">
                    <tr>
                        <td>
                        <table style="background-color: white; margin: auto; padding: 20px; width: 50%; border-radius: 10px;">
                            <tr>
                            <td style="text-align: center;">
                            <img style="width: 300px; height: 290px; margin: 0 auto;" src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684171091/czr5ef0g8qceitvhxkz0.png" alt="logo AR756" />
                            <h1 style="color: #333; width: 100%; text-align: center; margin-top: 10px;">Olá ${nome}!</h1>
                                <p>
                                    ${texto}
                                </p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </table>
            </div>
            `,
            /*   attachments: base64Files.map((item:any) => {
                return {
                filename: item.fileName,
                content: item.base64String,
                encoding: 'base64'
                }
            })  */
        };
        
        // Envia o e-mail
        await transporter.sendMail(mailOptions); 
    }
}

export {SendPersonalizadoEmailCase}  