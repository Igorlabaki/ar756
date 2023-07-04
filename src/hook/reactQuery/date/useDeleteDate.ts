

import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/service/query";

export function useDeleteData() {
  
  const {
    data: deleteData,
    isError: isDeleteDataError,
    isLoading: isDeleteDataLoading,
    isSuccess: isDeleteDataSuccess,
    mutate: deleteDataMutate
  } = useMutation({
    mutationFn: async (dataId: string | undefined) => {
      return api
        .delete(`/api/date/delete?dataId=${dataId}`)
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dateList"])
    }
  });

  return {
    deleteData,
    isDeleteDataError,
    isDeleteDataLoading,
    isDeleteDataSuccess,
    deleteDataMutate
  };
}