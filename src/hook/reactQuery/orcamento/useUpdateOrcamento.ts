import queryClient from "@/service/query";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { UpdateOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";


export default function useUpdateOrcamento(){
   
    const {
            data: updateOrcamento,
            isError: erroUpdateOrcamento,
            isLoading: IsUpdateOrcamentoLoading,
            isSuccess: isUpdateOrcamentoSuccess,
            mutate: updateOrcamentoMutate
        } = useMutation({
            mutationFn: async (bodyReq: UpdateOrcamentoParams) => {
                return   api
                .put("/api/orcamento/update", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["orcamentoList"])
            }
        }
    )

    return {updateOrcamento, erroUpdateOrcamento, IsUpdateOrcamentoLoading,isUpdateOrcamentoSuccess, updateOrcamentoMutate}
}
