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

export const useProductDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return (
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}/${id}`
        )
      ).data as Product;
    },
    onSuccess: (data, productId) => {
      queryClient.setQueryData<Product[]>(QUERY_KEYS.PRODUCT, (old = []) => {
        return old.filter((sup) => sup.id !== productId); // removes deleted supplier locally
      });
    },
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
