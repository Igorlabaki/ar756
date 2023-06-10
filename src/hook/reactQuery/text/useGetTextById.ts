import { Text } from "@prisma/client";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

export  function useGetTextById(){
    const {
            data: textById,
            isError: erroTextById,
            isLoading: IsTextByIdLoading,
            isSuccess: isTextByIdSuccess,
            mutate: getTextByIdMutate
        } = useMutation({
            mutationFn: async (textId: string) => {
                return   api
                .get(`/api/text/getById?textId=${textId}`)
                .then((resp : {data: Text}) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {textById, erroTextById, IsTextByIdLoading,isTextByIdSuccess, getTextByIdMutate}
}
