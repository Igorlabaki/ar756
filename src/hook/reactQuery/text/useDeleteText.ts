

import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/service/query";

export function useDeleteText() {
  
  const {
    data: deleteText,
    isError: isDeleteTextError,
    isLoading: isDeleteTextLoading,
    isSuccess: isDeleteTextSuccess,
    mutate: deleteTextMutate
  } = useMutation({
    mutationFn: async (textId: string) => {
      return api
        .delete(`/api/text/delete?textId=${textId}`)
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["textList"])
    }
  });

  return {
    deleteText,
    isDeleteTextError,
    isDeleteTextLoading,
    isDeleteTextSuccess,
    deleteTextMutate
  };
}