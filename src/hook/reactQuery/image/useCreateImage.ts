import { IImageParams } from "@/backend/repository/ImageRepository";
import { api } from "../../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";

export default function useCreateImage(){
   
    const {
            data: createImage,
            isError: erroCreateImage,
            isLoading: IsCreateImageLoading,
            isSuccess: isCreateImageSuccess,
            mutate: createImageMutate
        } = useMutation({
            mutationFn: async (bodyReq: IImageParams) => {
                return   api
                .post("/api/image/create", bodyReq)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["imagesList"])
            }
        }
    )

    return {createImage, erroCreateImage, IsCreateImageLoading,isCreateImageSuccess, createImageMutate}
}
