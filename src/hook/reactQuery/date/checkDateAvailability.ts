
import { useState } from "react";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { IDateEventParams, ValidateDateParam } from "@/backend/repository/IDateEventRepository";
import { IValidateTextParams } from "@/backend/repository/ITextRepository";

export function useCheckDateAvailability() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: checkDateAvailability,
    error: checkDateAvailabilityError,
    isError: isCheckDateAvailabilityError,
    isLoading: isCheckDateAvailabilityLoading,
    isSuccess: isCheckDateAvailabilitySuccess,
    mutate: checkDateAvailabilityMutate
  } = useMutation({
    mutationFn: async (bodyReq: ValidateDateParam) => {
      return api
        .post("/api/date/checkDateAvailability", bodyReq)
        .then((resp) => resp.data);
    },
    onError: (error: any) => {
    }
  });

  return {
    checkDateAvailability,
    errorMessage,
    checkDateAvailabilityError,
    checkDateAvailabilityMutate,
    isCheckDateAvailabilityError,
    isCheckDateAvailabilityLoading,
    isCheckDateAvailabilitySuccess,
  };
}