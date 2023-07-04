

import queryClient from "@/service/query";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { useGetOrcamentoListMutation } from "./useGetOrcamentoListMutation";


export function useDeleteOrcamento() {
  const {orcamentoListMutation} = useGetOrcamentoListMutation()
  const {
    data: deleteOrcamento,
    isError: isDeleteOrcamentoError,
    isLoading: isDeleteOrcamentoLoading,
    isSuccess: isDeleteOrcamentoSuccess,
    mutate: deleteOrcamentoMutate
  } = useMutation({
    mutationFn: async (orcamentoId: string | undefined) => {
      return api
        .delete(`/api/orcamento/delete?orcamentoId=${orcamentoId}`)
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      orcamentoListMutation({})
    }
  });

  return {
    deleteOrcamento,
    isDeleteOrcamentoError,
    isDeleteOrcamentoLoading,
    isDeleteOrcamentoSuccess,
    deleteOrcamentoMutate
  };
}