import { api } from "../../../service/axios";
import { CreateOrcAprovadoReqBody } from "@/types";
import { useMutation } from "@tanstack/react-query";

export  function useSendEmailOrcamentoAprovadoCliente(){
   
    const {
            data: sendEmailOrcamentoAprovadoCliente,
            isError: erroSendEmailOrcamentoAprovadoCliente,
            isLoading: IsSendEmailOrcamentoAprovadoClienteLoading,
            isSuccess: isSendEmailOrcamentoAprovadoClienteSuccess,
            mutate: sendEmailOrcAprovadoMutate
        } = useMutation({
            mutationFn: async (bodyReq: CreateOrcAprovadoReqBody) => {
                return   api
                .post("/api/email/orcamentoAprovadoCliente", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendEmailOrcamentoAprovadoCliente, erroSendEmailOrcamentoAprovadoCliente, IsSendEmailOrcamentoAprovadoClienteLoading,isSendEmailOrcamentoAprovadoClienteSuccess, sendEmailOrcAprovadoMutate}
}
