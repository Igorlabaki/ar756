import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IUpdateTextParams } from "@/backend/repository/ITextRepository";
import queryClient from "@/service/query";

export default function useUpdateText(){
   
    const {
            data: updateText,
            isError: erroUpdateText,
            isLoading: IsUpdateTextLoading,
            isSuccess: isUpdateTextSuccess,
            mutate: updateTextMutate
        } = useMutation({
            mutationFn: async (bodyReq: IUpdateTextParams) => {
                return   api
                .put("/api/text/update", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["textList"])
            }
        }
    )

    return {updateText, erroUpdateText, IsUpdateTextLoading,isUpdateTextSuccess, updateTextMutate}
}
