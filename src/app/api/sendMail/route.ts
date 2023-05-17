import { NextResponse,NextRequest} from 'next/server';
import nodemailer from "nodemailer"

export  async function POST(req: NextRequest) {

  const res = await req.json()
  const { nome, email, texto, dataInicio, horarioInicio,horarioFim,participantes,uploadedFiles } = res
    
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
      pass: 'rfjbbiheuvuprhnh', // Sua senha de e-mail
    },
  });

    // Preparar os anexos
    const attachments : any[] = [];
    
    const parsedRgPhotos = JSON.parse(uploadedFiles);
    if (parsedRgPhotos) {
      parsedRgPhotos.map((item: any) => {
        const { name, type, data } = item;
        attachments.push({ filename: name, contentType: type, content: Buffer.from(data, 'base64') });
      })
    }

  // Corpo do e-mail
  const mailOptions = {
    from: 'igorlabakig@gmail.com',
    to: 'igorlabakig@gmail.com',
    subject: 'Pedido de reserva',
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
      <img style="width: 200px; height: 190px; display: block; margin: 0 auto;" src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684171091/czr5ef0g8qceitvhxkz0.png" alt="logo AR756"/>
      <h1 style="color: #333;">Pedido de Reserva de Data</h1>
      <p style="font-size: 15px;"> <strong>Nome:</strong> ${nome}</p>
      <p style="font-size: 15px;"><strong>Email:</strong> ${email}</p>
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 15px;"> <strong>Data Inicio:</strong> ${dataInicio}</td>
          <td style="font-size: 15px;"><strong>Horario Inicio:</strong> : ${horarioInicio}</td>
          <td style="font-size: 15px;"><strong>Horario Final:</strong>  ${horarioFim}</td>
          <td style="font-size: 15px;"><strong>Participantes:</strong>  ${participantes}</td>
        </tr>
      </table>
      <p style="font-size: 15px;"><strong>Descrição do evento:</strong>: ${texto}</p>
    </div>
  `,
  attachments: attachments, 
  };

  // Envia o e-mail
  await transporter.sendMail(mailOptions);

  return NextResponse.json({ message: 'Email enviado com sucesso!' }); 
}