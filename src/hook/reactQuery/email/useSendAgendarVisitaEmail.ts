import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/service/query";
import { CreateInfoFormData } from "@/zod/types/reservaFormZodType";
import { ISendAgendarVisitaEmailParams } from "@/backend/useCase/email/sendAgendarVisitaEmailCase/sendAgendarVisitaEmailCase";

export default function useSendAgendarVisitaEmail(){
    const {
            data: sendAgendarVisitaMail,
            isError: erroSendAgendarVisitaMail,
            isLoading: IsSendAgendarVisitaMailLoading,
            isSuccess: isSendAgendarVisitaMailSuccess,
            mutate: sendMailMutate
        } = useMutation({
            mutationFn: async (bodyReq: ISendAgendarVisitaEmailParams) => {
                return   api
                .post("/api/email/agendarVisita", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {sendAgendarVisitaMail, erroSendAgendarVisitaMail, IsSendAgendarVisitaMailLoading,isSendAgendarVisitaMailSuccess, sendMailMutate}
}
