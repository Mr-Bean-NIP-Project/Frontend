import axios from "axios";
import { useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { NIP, Product } from "@/types/types";
import { formatAndDownloadNip } from "../excel/NIPExcel";
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
      queryClient.removeQueries(QUERY_KEYS.PRODUCT_NIP); // remove all the product NIPs if there's any product deletion
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

export const useProductUpdate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const payloadWithoutId = Object.fromEntries(
        Object.entries(payload).filter(([key]) => !["id"].includes(key))
      );
      return (
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}/${payload.id}`,
          payloadWithoutId
        )
      ).data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(QUERY_KEYS.PRODUCT, (old = []) => {
        const oldDataIndex = old.findIndex((prod) => prod.id === data.id);
        if (oldDataIndex === -1) return old;
        old[oldDataIndex] = { ...data }; // replaces old Product info with newly updated Product
        return old;
      });
      queryClient.removeQueries(QUERY_KEYS.PRODUCT_NIP); // remove all NIP if Product is updated
    },
  });
};

export const useProductGetNip = (id?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT_NIP_ID(id),
    queryFn: async () => (id ? await getProductNip(id) : undefined),
  });
};

export async function getProductNip(id: number): Promise<NIP> {
  return (
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${QUERY_KEYS.PRODUCT}/${id}/nip`
    )
  ).data as NIP;
}

export const useProductGetNipExcel = (id?: number) => {
  const { data: nip } = useProductGetNip(id);
  useEffect(() => {
    if (!nip) return;
    formatAndDownloadNip(nip);
  }, [nip]);
};
