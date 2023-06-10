import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/service/query";
import { CreateInfoFormData } from "@/zod/types/reservaFormZodType";

export default function useSendEmailOrcamento(){
    const {
            data: sendMail,
            isError: erroSendMail,
            isLoading: IsSendMailLoading,
            isSuccess: isSendMailSuccess,
            mutate: sendMailMutate
        } = useMutation({
            mutationFn: async (bodyReq: CreateInfoFormData) => {
                return   api
                .post("/api/email/orcamento", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendMail, erroSendMail, IsSendMailLoading,isSendMailSuccess, sendMailMutate}
}
