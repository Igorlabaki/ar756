import { Orcamento } from "@prisma/client";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";

export  function useGetOrcamentoListMutation(){
    const {
            data: orcamentoListMutationData,
            isError: erroOrcamentoListMutationData,
            isLoading: IsOrcamentoListMutationDataLoading,
            isSuccess: isOrcamentoListMutationDataSuccess,
            mutate: orcamentoListMutation
        } = useMutation({
            mutationFn: async (reference: ListOrcamentoParams) => {
                return   api
                .get(`/api/orcamento/list`, {
                    params: {
                        field: reference.field,
                        orderBy: reference.orderBy,
                    },
                })
                .then((resp : {data: Orcamento[]}) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {orcamentoListMutationData, erroOrcamentoListMutationData, IsOrcamentoListMutationDataLoading,
        isOrcamentoListMutationDataSuccess, orcamentoListMutation}
}
