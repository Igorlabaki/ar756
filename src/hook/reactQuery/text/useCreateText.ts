
import queryClient from "@/service/query";
import { CreateTextReqBody } from "@/types";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";


export function useCreateText() {

  const {
    data: createText,
    isError: isCreateTextError,
    isLoading: isCreateTextLoading,
    isSuccess: isCreateTextSuccess,
    mutate: createTextMutate
  } = useMutation({
    mutationFn: async (bodyReq: CreateTextReqBody) => {
      return api
        .post("/api/text/create", bodyReq)
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["textList"])
    }
  });

  return {
    createText,
    isCreateTextError,
    isCreateTextLoading,
    isCreateTextSuccess,
    createTextMutate
  };
}