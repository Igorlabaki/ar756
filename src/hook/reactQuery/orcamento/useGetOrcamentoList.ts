import { ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";
import { api } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrcamentoList(params: ListOrcamentoParams){
    const { field, orderBy } = params;
    const {
        data: orcamentoList,
        isError: errorOrcamentoList,
        isLoading: orcamentoListIsLoading, 
        } = useQuery({
            queryKey: ["orcamentoList"],
            queryFn: async () => {
                return  api.get(`/api/orcamento/list`, {
                    params: {
                        field: field,
                        orderBy: orderBy,
                    },
                }
            ).then((resp ) => resp.data)
            },
        }
    );
    return {orcamentoList, errorOrcamentoList,orcamentoListIsLoading}
}