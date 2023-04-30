import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";
import { NIP, Product } from "@/types/types";
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
        return old
          .filter((prod) => prod.id !== productId)
          .map((prod) => {
            // remove self as sub product from other parent products
            if (prod.product_sub_products) {
              prod.product_sub_products = prod.product_sub_products.filter(
                (sp) => sp.child.id !== productId
              );
            }
            return prod;
          }); // removes deleted product locally
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

export const useProductGetNip = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT_NIP_ID(id),
    queryFn: async () =>
      (
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}/${id}/nip`
        )
      ).data as NIP,
  });
};
