'use client';

import { BiBeer, BiDumbbell } from 'react-icons/bi';
import { BsCarFrontFill, BsFlower1 } from 'react-icons/bs';
import { FaSwimmingPool, FaWifi } from 'react-icons/fa';
import { GiBarbecue, GiDress, GiPartyPopper } from 'react-icons/gi';
import { MdSoupKitchen } from 'react-icons/md';
import { ImageComponent } from '@/components/utils/image';
import { motion } from 'framer-motion';
import { CardComponent } from '../card';
import { ItemCardComponent } from '../card/itemCard';
import { ButtonComponent } from '../utils/button';
import { ModalComponent } from '../utils/modal';
import { ConsultarFormComponent } from '../consultar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ComodidadeCardComponent() {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { push } = useRouter();
  // Função para verificar se a tela é pequena ou grande
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Por exemplo, consideramos 768px como o ponto de corte para ser uma tela pequena
  };

  // Executa a função ao montar o componente
  useEffect(() => {
    checkScreenSize();

    // Adiciona um listener para verificar quando a tela for redimensionada
    window.addEventListener("resize", checkScreenSize);

    // Remove o listener ao desmontar o componente para evitar vazamentos de memória
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <CardComponent
      h=" h-full md:h-[500px]"
      w={'w-full m-auto md:w-[450px]'}
      className={`md:absolute  text-black   min-w-full
              rounded-md shadow-lg md:bottom-[6.5rem] md:right-[18%] mb-5 md:mb-10 
              `}
    >
      <div className="relative flex items-center justify-end w-full space-x-3">
        <div className="flex items-center justify-end w-[14.375rem] ">
          <ImageComponent
            alt={'logo'}
            h={'h-[60px] '}
            w={'w-[100px]'}
            src={'https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png'}
          />
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 'some' }}
          className="border-[1px] border-black  h-0 "
        />
        <h1 className="absolute w-full text-2xl text-black top-[2.6rem] left-8">COMODIDADES</h1>
      </div>
      <div className="flex mt-8 gap-x-5 flex-1">
        <div className="space-y-3">
          <ItemCardComponent
            title="Wifi"
            icon={<FaWifi size={20} />}
          />
          <ItemCardComponent
            title="Piscina"
            icon={<FaSwimmingPool size={20} />}
          />
          <ItemCardComponent
            title="Cozinha"
            icon={<MdSoupKitchen size={20} />}
          />

          <ItemCardComponent
            title="Churrasqueira"
            icon={<GiBarbecue size={20} />}
          />
          <ItemCardComponent
            title="Salao de Festa"
            icon={<GiPartyPopper size={20} />}
          />
        </div>
        <div className="space-y-3">
          <ItemCardComponent
            title="Bar"
            icon={<BiBeer size={20} />}
          />
          <ItemCardComponent
            title="Jardim"
            icon={<BsFlower1 size={20} />}
          />
          <ItemCardComponent
            title="Camarim"
            icon={<GiDress size={20} />}
          />
          <ItemCardComponent
            title="Garagem"
            icon={<BsCarFrontFill size={20} />}
          />
          <ItemCardComponent
            title="Academia"
            icon={<BiDumbbell size={20} />}
          />
        </div>
      </div>
      <ButtonComponent
        title="CONSULTAR"
        className={`
          z-30
          px-10 py-4
          text-[15px]  md:text-[20px]
          hover:bg-zinc-900
           tracking-[0.30rem] text-white rounded-md bg-black
          transition duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95] active:transition-none active:duration-700
          `}
          onClick={() => {
            if(isSmallScreen){
              push("/consultar")
            }else{
              setisModalOpen(true)
            }
          }}
      />
      {isModalOpen && (
        <ModalComponent onClose={() => setisModalOpen(false)}>
          <ConsultarFormComponent
            handleCloseReservaModal={() => setisModalOpen(false)}
          />
        </ModalComponent>
      )}
    </CardComponent>
  );
}
