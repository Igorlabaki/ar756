

import { calcDiaria } from '@/function/calcDiaria';
import { calcDuracaoFesta } from '@/function/calcDuracaoFesta';
import { calcHorasExtras } from '@/function/calcHorasExtra';
import { calcQtdHoraExtra } from '@/function/calcQtdHoraExtra';
import { NextResponse,NextRequest} from 'next/server';
import nodemailer from "nodemailer"

interface reqBody{
  nome:string,
  email:string,
  texto:string
  dataInicio: string,
  horarioInicio: string,
  horarioFim: string,
   convidados: number, 
   seguranca: boolean, 
   recepcionista: boolean, 
   limpeza :boolean
}

export  async function POST(req: NextRequest) {

  const res = await req.json()
  const { nome, email, texto, dataInicio, horarioInicio,horarioFim,convidados, seguranca, recepcionista, limpeza }: reqBody = res
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
      pass: 'rfjbbiheuvuprhnh', // Sua senha de e-mail
    },
  });

  const data1 = new Date(`${dataInicio}T${horarioInicio}`);
  const data2 = new Date(`${dataInicio}T${horarioFim}`);


  const duracaoFesta  = calcDuracaoFesta(data1,data2)
  const diaria        = calcDiaria(convidados,[seguranca,recepcionista,limpeza])
  const qtdHoraExtra  = calcQtdHoraExtra(diaria,duracaoFesta)
  const valorHoraExtra  = calcHorasExtras(duracaoFesta,diaria)
  const total = diaria + valorHoraExtra * qtdHoraExtra


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
      <p style="font-size: 15px;"><strong>Convidados:</strong> ${convidados}</p>
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 15px;"> <strong>Data Inicio:</strong> ${dataInicio}</td>
          <td style="font-size: 15px;"><strong>Horario Inicio:</strong> : ${horarioInicio}</td>
          <td style="font-size: 15px;"><strong>Horario Final:</strong>  ${horarioFim}</td>
          <td style="font-size: 15px;"><strong>Duracao evento:</strong>  ${duracaoFesta}</td>
        </tr>
      </table>
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 15px;"> <strong>Seguranca:</strong> ${recepcionista ? "Sim" : "Nao"}</td>
          <td style="font-size: 15px;"><strong>Limpeza:</strong> : ${limpeza ? "Sim" : "Nao"}</td>
          <td style="font-size: 15px;"><strong>Seguranca:</strong>  ${seguranca ? "Sim" : "Nao"}</td>
        </tr>
      </table>
      <p style="font-size: 15px;"><strong>Descrição do evento:</strong>: ${texto}</p>
      <h3 style="font-size: 45px;"><strong>Total:</strong>R$${total},00</h3>
      <p style="font-size: 15px;">* Em caso de horas extras sera cobrado por hora um adicional de: R$${valorHoraExtra},00</p>
      <p style="font-size: 15px;">* Condições de pagamento: 50% no ato da reserva, e 50% até uma semana antes da data.</p>
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

  return NextResponse.json({ res }); 
}