import { DateEvent, Orcamento } from "@prisma/client";
import { api } from "../../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { DataEventExtendOrcamento } from "@/types";

export  function useGetDataById(){
    const {
            data: dataByid,
            isError: erroDataByid,
            isLoading: IsDataByidLoading,
            isSuccess: isDataByidSuccess,
            mutate: dataByidMutate
        } = useMutation({
            mutationFn: async (bodyReq: string) => {
                return   api
                .get(`/api/date/getById?dataId=${bodyReq}`)
                .then((resp : {data: DataEventExtendOrcamento}) => resp.data)
            },
            onSuccess: () => {
                
            }
        }
    )

    return {dataByid, erroDataByid, IsDataByidLoading,isDataByidSuccess, dataByidMutate}
}
