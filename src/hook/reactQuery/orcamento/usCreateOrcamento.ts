import queryClient from "@/service/query";
import { Orcamento } from "@prisma/client";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";
import { useGetOrcamentoListMutation } from "./useGetOrcamentoListMutation";


export  function useCreateOrcamento(){
    const {orcamentoListMutation} = useGetOrcamentoListMutation()
    const {
            data: createOrcamento,
            isError: erroCreateOrcamento,
            isLoading: IsCreateOrcamentoLoading,
            isSuccess: isCreateOrcamentoSuccess,
            mutate: createOrcamentoMutate
        } = useMutation({
            mutationFn: async (bodyReq: IOrcamentoParams) => {
                return   api
                .post(`/api/create/}`, bodyReq)
                .then((resp : {data: Orcamento}) => resp.data)
            },
            onSuccess: () => {
                orcamentoListMutation({})
            }
        }
    )

    return {createOrcamento, erroCreateOrcamento, IsCreateOrcamentoLoading,isCreateOrcamentoSuccess, createOrcamentoMutate}
}
