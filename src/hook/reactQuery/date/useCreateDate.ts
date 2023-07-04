
import { useState } from "react";
import queryClient from "@/service/query";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IDateEventParams } from "@/backend/repository/IDateEventRepository";

export function useCreateDate() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: createDate,
    error: createDateError,

    isError: isCreateDateError,
    isLoading: isCreateDateLoading,
    isSuccess: isCreateDateSuccess,
    mutate: createDateMutate
  } = useMutation({
    mutationFn: async (bodyReq: IDateEventParams) => {
      return api
        .post("/api/date/create", bodyReq)
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dateList"])
    }
  });

  return {
    createDate,
    errorMessage,
    createDateError,
    createDateMutate,
    isCreateDateError,
    isCreateDateLoading,
    isCreateDateSuccess,
  };
}