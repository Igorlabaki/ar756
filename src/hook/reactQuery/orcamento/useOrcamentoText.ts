

import queryClient from "@/service/query";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

export function useDeleteOrcamento() {
  
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
      queryClient.invalidateQueries(["orcamentoList"])
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