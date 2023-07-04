import { api } from "../../../service/axios";
import {  SendFeddbackEmailReqBody } from "@/types";
import { Orcamento } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export  function useSendFeedbackEmail(){
    const {
            data: sendFeedbackEmail,
            isError: erroSendFeedbackEmail,
            isLoading: IsSendFeedbackEmailLoading,
            isSuccess: isSendFeedbackEmailSuccess,
            mutate: sendFeedbackEmailMutate
        } = useMutation({
            mutationFn: async (bodyReq: SendFeddbackEmailReqBody) => {
                return   api
                .post("/api/email/feedback", bodyReq)
                .then((resp : {data: Orcamento}) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendFeedbackEmail, erroSendFeedbackEmail, IsSendFeedbackEmailLoading,isSendFeedbackEmailSuccess, sendFeedbackEmailMutate}
}
