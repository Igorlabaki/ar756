import { ImageComponent } from "@/components/image";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { motion } from "framer-motion";

interface RegrasProps {
  handleCloseregrasModal: () => void;
}

export function RegrasCardComponent({ handleCloseregrasModal }: RegrasProps) {
  const [ar756ModalMode, setAr756ModalMode] = useState<"SOBRE" | "REGRAS">(
    "SOBRE"
  );
  return (
    <div className="w-full">
      <GrFormClose
        className="absolute rounded-full cursor-pointer right-2 top-2 hover:bg-gray-200"
        onClick={handleCloseregrasModal}
      />
      <ImageComponent
        alt={"logo"}
        h={"h-[180px]"}
        w={"w-[250px]"}
        src={`/images/logo-vila-preto.png`}
        containerClassname={"z-20 rounded-md -ml-2  "}
      />
      <div className="flex gap-x-5 font-semibold text-[13px] mb-10 relative">
        <p
          className={`relative cursor-pointer tracking-[0.10rem]`}
          onClick={() => setAr756ModalMode("SOBRE")}
        >
          SOBRE
        </p>
        <p
          className={`relative cursor-pointer tracking-[0.10rem]`}
          onClick={() => setAr756ModalMode("REGRAS")}
        >
          REGRAS
        </p>
        <motion.hr
          className="absolute bottom-0 left-0 text-black border-2 border-black "
          initial={{
            width: "45px",
          }}
          animate={{
            width: ar756ModalMode.includes("SOBRE") ? "45px" : "55px",
            x: ar756ModalMode.includes("REGRAS") ? "68px" : "0px",
            transition: {
              duration: 0.5,
            },
          }}
        />
      </div>

      {ar756ModalMode.includes("SOBRE") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: ar756ModalMode.includes("SOBRE") ? 1 : 0,
            transition: { duration: 0.5 },
          }}
          className="flex flex-col items-start justify-center gap-x-3"
        >
          <div className="flex flex-col ">
            <p className="text-justify">
              A AR756 possui um amplo com jardim e piscina, arquitetura
              contemporânea, muito bem conservado. Iluminado e arejado com muito
              espaço para tirarem fotos incríveis, gravar clipes, também para
              realização de eventos e workshops !! No meio de um jardim natural
              incrível, com piscina, e dois estúdios ( Galpão e Salão ) sem
              pernoite ! Lugar incrível e cheio de estilo. O valor da locação
              não inclui pernoite e está limitada a 8 pessoas no total; para
              eventos e produções maiores este valor base é apenas referência.
            </p>
            <div className="flex flex-col mt-4 gap-y-3">
              <p className="font-semibold text-[18px]">O ESPACO</p>
              <div className="text-justify">
                São dois espaços cobertos no térreo com pé direito duplo ( 5 e 7
                metros ) com dois banheiros junto a piscina e churrasqueira.
                Encontrará ainda na área junto à churrasqueira, cozinha equipada
                com geladeira, fogão e microondas. A área total é de cerca de
                600 metros. Mais informações na sessão Regras da Casa.
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-y-3">
              <p className="font-semibold text-[18px]">ACESSO DOS HOSPEDES</p>
              <div className="text-justify">
                A parte superior só poderá ser usada para serem tiradas fotos
                exclusivamente mediante prévia solicitação e autorização. Leia
                as Regras da Casa antes de enviar sua consulta, lá se esclarecem
                a maioria das dúvidas e sua leitura é fundamental.
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-y-3">
              <p className="font-semibold text-[18px]">
                OUTRAS COISAS A TER EM CONTA
              </p>
              <div className="text-justify">
                Eventos estão permitidos entretanto o valor terá de ser
                negociado em função do tipo de evento, quantidade de pessoas,
                horário e etc, portanto para obter uma cotação para o seu
                evento, envie na primeira mensagem informações como número total
                de pessoas, horário desejado e tipo de evento; ( a base de
                cálculo para uma idéia concreta de valor é de 100 reais por
                pessoa acrescidos à tarifa padrão acima de 08 pessoas ) Moro na
                casa e estou presente no checkin e checkout. Ao reservar você
                declara ter lido e aceito as Regras da Casa!
              </div>
            </div>
            <p className="text-lg text-[16px] font-semibold mt-10">
              Faça Sua Reserva Hoje e Desfrute de um Espaço Incrível
            </p>
          </div>
        </motion.div>
      )}
      {ar756ModalMode.includes("REGRAS") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: ar756ModalMode.includes("REGRAS") ? 1 : 0,
            transition: { duration: 0.5 },
          }}
          className="flex flex-col gap-y-2"
        >
          <p className="text-justify">
            <strong>1.</strong> A diária compreende o período de 8 horas, e
            decorre em horário comercial, podendo ter início a partir das 9
            horas da manhã, devendo o encerramento ser até no máximo às 18
            horas, sempre do mesmo dia. Solicitações para outros horários
            deverão ser cotadas, sob consulta, mas nunca passamos das 22h.
          </p>
          <p className="text-justify">
            <strong>2. </strong> O seu check out não é a meia noite, esta
            informação no itinerário “antes da 00h” significa que a reserva
            encerra no mesmo dia, o horário pré acordado nas mensagens será o
            horário que terá de respeitar, portanto se a sua diária for
            combinada por exemplo das 10-18h, independente do horário que você
            chegue, as 18h a casa deverá estar liberada. Organize-se para
            encerrar com alguma antecedência e realizar o check out até o
            horário acordado.
          </p>
          <p className="text-justify">
            <strong>3. </strong> O valor base não inclui o uso da piscina e
            churrasqueira, nem autoriza festas e/ou reuniões confraternizações
            com consumo de bebidas alcóolicas, atende somente corporativo.
            Demais solicitações serão estudadas e orçadas caso a caso. Não
            inclui qualquer tipo de equipamento. ( Luz, Som, etc ) Para eventos
            é necessário consultar valor, indicando o tipo de evento, o número
            de convidados, número de horas ( indicar hrs de início e fim ) etc;
          </p>
          <p className="text-justify">
            <strong>4.</strong> Moro na casa e estou presente no checkin e
            checkout. Como pré condição, será necessário enviar scan/photo da
            página de identificação de seu(s) passaporte(s) ou documento(s) de
            identidade até 1 dia antes da sua chegada. Ao finalizar sua diária,
            será necessário recolher todos os seus pertences e providenciar a
            limpeza e retirada de lixos.
          </p>
          <p className="text-justify">
            <strong>5.</strong> NÃO É PERMITIDO DEIXAR NENHUM OBJETO APÓS TER
            FINALIZADO A DIÁRIA. Ao finalizar o seu trabalho, todos os pertences
            devem ser recolhidos; a permanência de produtos e equipamentos
            fotográficos, roupas, fundos, e/ou quaisquer objetos que ficarem no
            espaço , será cobrada como diária, até a retirada dos mesmos.
          </p>
          <p className="text-justify">
            <strong>6.</strong> Caso sejam movimentados os móveis que compõe a
            decoração da propriedade; os mesmos deverão obrigatoriamente ser
            retornados exatamente aos mesmos locais em que estavam, sob pena de
            multa no valor de 250 reais caso não sejam reorganizados conforme
            estavam na sua chegada; portanto se for tirar algo do lugar será
            responsável por devolver exatamente onde estava.
          </p>
          <p className="text-justify">
            <strong>7.</strong> Não fume, coma ou beba nos sofás, também é
            desnecessário dizer que não deverá em hipótese alguma subir neles ,
            sentar estando molhado, ou retirar suas almofadas e colocar no chão
            afinal eles são brancos, caso sejam sujos será cobrada lavagem
            especializada de tecidos que tem o valor de 500 reais, e caso sejam
            danificados, furados, ou as manchas não sejam removíveis o hóspede
            arcará com o custo da troca do estofamento total o que é bastante
            oneroso em se tratando de móveis de alto padrão, portanto tenha
            respeito pelo patrimônio a si disponibilizado e cuide para que as
            pessoas que estão contigo também tenham cuidado para não causar
            quaisquer danos que possam ser a si atribuídos e portanto cobrados.
          </p>
          <p className="text-justify">
            <strong>8.</strong> É proibido entrar na piscina com óleo
            bronzeador, colocar dentro dela quaisquer móveis e beber ou fumar
            estando dentro dela, também é proibido a utilização de acessórios
            metálicos pois estes podem causar danos ao casco.
          </p>
          <p className="text-justify">
            <strong>9.</strong> A não desocupação do espaço nas condições
            estabelecidas acima, até o horário acordado durante a troca de
            mensagens na plataforma, ensejará pagamento adicional de mil reais
            por hora adicional, condição esta inegociável, portanto organize-se
            para liberar o espaço livre e desembaraçado, organizado e limpo até
            o horário firmado ou você será cobrado pelo período adicional sem
            prejuízo de demais medidas. Caso você se atrase para o check in não
            poderá compensar no check out, organize-se para cumprir os horários
            previamente negociados. Você que leu até aqui, obrigado, é
            importante pois reforça seu cuidado com o que cuidadosamente lhe
            oferecemos.
          </p>
          <p className="text-lg text-[16px] font-semibold mb-10">
            Esperamos proporcionar uma experiência incrível, aguardamos sua
            reserva!
          </p>
        </motion.div>
      )}
    </div>
  );
}
