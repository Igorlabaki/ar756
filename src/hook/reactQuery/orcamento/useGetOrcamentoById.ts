import { Orcamento } from "@prisma/client";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

export  function useGetOrcamentoById(){
    const {
            data: orcamentoByid,
            isError: erroOrcamentoByid,
            isLoading: IsOrcamentoByidLoading,
            isSuccess: isOrcamentoByidSuccess,
            mutate: orcamentoByidMutate
        } = useMutation({
            mutationFn: async (bodyReq: string) => {
                return   api
                .get(`/api/orcamento/getById?orcamentoId=${bodyReq}`)
                .then((resp : {data: Orcamento}) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {orcamentoByid, erroOrcamentoByid, IsOrcamentoByidLoading,isOrcamentoByidSuccess, orcamentoByidMutate}
}
