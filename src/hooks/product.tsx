import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../types/constants";
import { Product } from "@/types/types";

export const useProductGet = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT,
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}`))
        .data as Product[],
  });
};
