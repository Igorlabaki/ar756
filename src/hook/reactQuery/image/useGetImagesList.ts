import { api } from "@/service/axios";
import { Image } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface UseGetimageListParams{
    imageId:string | undefined,
    search: string
}

export default function useGetimagesList(){

    const {
        data: imageList,
        isError: errorimageList,
        isLoading: imageListIsLoading, 
        } = useQuery({
            queryKey: ["imagesList"],
            queryFn: async () => {
            return  api.get(`/api/image/list`
            ).then((resp: { data: {
                listImages:Image[]
            }}) => resp.data.listImages)
            },
        }
    );
    return {imageList, errorimageList, imageListIsLoading}
}
        

