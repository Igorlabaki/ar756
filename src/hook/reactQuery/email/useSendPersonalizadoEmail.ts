import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ISendPersonalizadoEmailParams } from "@/backend/useCase/email/sendPersonalizadoEmailCase/sendPersonalizadoEmailCase";

export  function useSendPersonalizadoEmail(){
    const {
            data: sendPersonalizadoEmail,
            isError: erroSendPersonalizadoEmail,
            isLoading: IsSendPersonalizadoEmailLoading,
            isSuccess: isSendPersonalizadoEmailSuccess,
            mutate: sendPersonalizadoEmailMutate
        } = useMutation({
            mutationFn: async (bodyReq: ISendPersonalizadoEmailParams) => {
                return   api
                .post("/api/email/personalizado", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendPersonalizadoEmail, erroSendPersonalizadoEmail, IsSendPersonalizadoEmailLoading,isSendPersonalizadoEmailSuccess, sendPersonalizadoEmailMutate}
}
