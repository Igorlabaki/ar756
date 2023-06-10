import { IBase64Files } from "@/types";
import { Orcamento } from "@prisma/client";
import nodemailer from "nodemailer"

export interface ISendEmailOrcamentoAprovadoParams{
    orcamento: Orcamento | null
    documentos: { fileName: string; base64String?: unknown; }[] | undefined
}

class SendEmailOrcAprovadoCase {
    async execute( {orcamento,documentos} : ISendEmailOrcamentoAprovadoParams ){

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
              pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
            },
        });

        const extras = [
            orcamento?.limpeza,
            orcamento?.seguranca,
            orcamento?.recepcionista,
        ].filter((item) => {
            return item
        })
        
        const mailOptions = {
            from: 'igorlabakig@gmail.com',
            to:   'igorlabakig@gmail.com',
            subject: `Proposta Aprovada - ${orcamento?.nome}`,
            html: `
            <body>
                <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Relatório de Orçamento</h1>

                <h2 style="margin-top: 50px;"3>Info Pessoal:</h2>
                <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Nome</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.nome}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Email</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.email}</td>
                    </tr>
                    <tr>
                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Telefone</th>
                    <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.telefone}</td>
                    </tr>
                    <tr>
                    <tr>
                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Conhece o Espaço</th>
                    <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.conheceEspaco ? 'Sim' : 'Não'}</td>
                    <tr>
                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Trafego Canal</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.trafegoCanal}</td>
                        </tr>
                </tr>
                </table>

                <h2 style="margin-top: 30px;">Info Evento:</h2>
                <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Data de Início</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.dataInicio}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Horário de Início</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.horarioInicio}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Convidados</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.convidados}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Horário de Fim</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.horarioFim}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Segurança</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.seguranca ? 'Sim' : 'Não'}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Limpeza</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.limpeza ? 'Sim' : 'Não'}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Recepcionista</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.recepcionista ? 'Sim' : 'Não'}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Descricao:</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.texto}</td>
                    </tr>
                </table>


                <h2 style="margin-top: 30px;">Valores:</h2>
                <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Aprovado</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;font-weight: bold;color: ${orcamento?.aprovado ? "green" : "red"}">${orcamento?.aprovado ? 'Sim' : 'Não'}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Valor Base</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.valorBase}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Valor da Hora Extra ( ${orcamento?.qtdHorasExtras}hrs. )</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.valorHoraExtra && orcamento?.valorHoraExtra * orcamento?.qtdHorasExtras}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">SEG/LIMP/REC</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${extras.length * 200}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd; font-weight: bold;">Total</th>
                        <td style="padding: 8px; text-align: left; border-bottom: 1px solid #dddddd;">${orcamento?.total}</td>
                    </tr>
                </table>
                <div>
                    <h2>Feedback:</h2>
                    <p style="width: 100%;backgoundColor: rgb(240, 239, 237) ;">${orcamento?.feedback}</p>
                </div>
            </body>
            `,
            attachments: documentos && documentos.map((item:any) => {
                return {
                filename: item.fileName,
                content: item.base64String,
                encoding: 'base64'
                }
            })  
        };
        
        // Envia o e-mail
        await transporter.sendMail(mailOptions); 
    }
}

export {SendEmailOrcAprovadoCase}  