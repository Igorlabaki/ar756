
import { useState } from "react";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IDateEventParams } from "@/backend/repository/IDateEventRepository";
import { AxiosError } from "axios";

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
    onError: (error) => {
      
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