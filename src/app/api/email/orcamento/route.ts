import { NextResponse,NextRequest} from 'next/server';
import { sendEmailFactory } from '@/backend/useCase/email/sendEmailCase/sendEmailFactory';
import { createOrcamentoFactory } from '@/backend/useCase/Orcamento/createOrcamentoCase/createOrcamentoFactory';
import { CreateOrcamentoReqBody } from '@/types';
import { calcDiaria } from '@/function/calcDiaria';
import { calcQtdHoraExtra } from '@/function/calcQtdHoraExtra';
import { calcHorasExtras } from '@/function/calcHorasExtra';
import moment from 'moment';
import { calcDuracaoFesta } from '@/function/calcDuracaoFesta';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  const { nome, email,convidados,seguranca,recepcionista,limpeza,horarioFim,horarioInicio,dataInicio}: CreateOrcamentoReqBody = res

  const data1 = new Date(
    `${dataInicio}T${horarioInicio}`
  );
  const data2 = new Date(
    `${dataInicio}T${horarioFim}`
  );

  const date = moment(data1);
  const formattedDate = date.format("DD/MM/YYYY");

  const duracaoFesta = calcDuracaoFesta(data1, data2);

  const diaria = calcDiaria(convidados, [
    seguranca,
    recepcionista,
    limpeza,
  ]);

  const qtdHorasExtras = calcQtdHoraExtra(diaria.total, duracaoFesta);
  const valorHoraExtra = calcHorasExtras(diaria.total);
  const total = diaria.total + valorHoraExtra * qtdHorasExtras;

  const novoOrcamento = await createOrcamentoFactory().handle({
    ...res,
    dataInicio: formattedDate,
    total,
    qtdHorasExtras,
    valorBase: diaria.valorBase,
    valorHoraExtra,
  })       

  const sendEmail  = await sendEmailFactory().handle({nome,email,orcamentoId: novoOrcamento?.id})

  return NextResponse.json({ sendEmail }); 
}