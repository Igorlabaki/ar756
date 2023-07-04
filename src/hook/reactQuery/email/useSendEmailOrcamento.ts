import queryClient from "@/service/query";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";

export default function useSendEmailOrcamento(){
    const {
            data: sendMail,
            isError: erroSendMail,
            isLoading: IsSendMailLoading,
            isSuccess: isSendMailSuccess,
            mutate: sendMailMutate
        } = useMutation({
            mutationFn: async (bodyReq: IOrcamentoParams) => {
                return   api
                .post("/api/email/orcamento", bodyReq)
                .then((resp)   => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["orcamentoList"])
            }
        }
    )

    return {sendMail, erroSendMail, IsSendMailLoading,isSendMailSuccess, sendMailMutate}
}
