import { api } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetDateList(){

    const {
        data: dateList,
        isError: errorDateList,
        isLoading: dateListIsLoading, 
        } = useQuery({
            queryKey: ["dateList"],
            queryFn: async () => {
            return  api.get(`/api/date/list`
            ).then((resp ) => resp.data)
            },
        }
    );
    return {dateList, errorDateList, dateListIsLoading}
}