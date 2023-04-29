import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";
import { Product } from "@/types/types";
import { QUERY_KEYS } from "../types/constants";

export const useProductGet = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT,
    queryFn: async () =>
      (
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}`
        )
      ).data as Product[],
  });
};

export const useProductCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newProduct: Product) => {
      return (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}`,
          newProduct
        )
      ).data as Product;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(QUERY_KEYS.PRODUCT, (old = []) => {
        return [...old, data]; // appends newly created product to list
      });
    },
  });
};
