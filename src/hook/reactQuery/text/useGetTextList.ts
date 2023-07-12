import { api } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetTextList() {
    const {
        data: textList,
        isError: errortextList,
        isLoading: textListIsLoading,
    } = useQuery({
        queryKey: ["textList"],
        queryFn: async () => {
        return api.get(`/api/text/list`, {
            headers: {
            'Access-Control-Allow-Origin': 'https://ar756.vercel.app/dashboard',
            },
        }).then((resp) => resp.data);
        },
    });

    return { textList, errortextList, textListIsLoading };
}
