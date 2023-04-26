import axios from "axios";
import { useQuery } from "react-query";
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
