import { api } from "../../../service/axios";
import {  SendFeddbackEmailReqBody } from "@/types";
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
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendFeedbackEmail, erroSendFeedbackEmail, IsSendFeedbackEmailLoading,isSendFeedbackEmailSuccess, sendFeedbackEmailMutate}
}
