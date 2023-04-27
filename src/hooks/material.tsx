import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../types/constants";
import { Material } from "../types/types";

export const useMaterialGet = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MATERIAL,
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/material`))
        .data as Material[],
  });
};

export const useMaterialDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return (
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/material/${id}`)
      ).data as Material;
    },
    onSuccess: (data, materialId) => {
      queryClient.setQueryData<Material[]>(QUERY_KEYS.MATERIAL, (old = []) => {
        return old.filter((mat) => mat.id !== materialId); // removes deleted material locally
      });
    },
  });
};

export const useMaterialCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newMaterial: Material) => {
      return (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/material`,
          newMaterial
        )
      ).data as Material;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Material[]>(QUERY_KEYS.MATERIAL, (old = []) => {
        return [...old, data]; // appends newly created material to list
      });
    },
  });
};
