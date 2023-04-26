import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../types/constants";
import { Supplier } from "../types/types";

export const useSupplierGet = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIER,
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)).data,
  });
};

export const useSupplierDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return (
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`)
      ).data as Supplier;
    },
    onSuccess: (data, supplierId) => {
      queryClient.setQueryData<Supplier[]>(QUERY_KEYS.SUPPLIER, (old = []) => {
        return old.filter((sup) => sup.id !== supplierId); // removes deleted supplier locally
      });
      notifications.show({
        title: "Delete Successful",
        color: "green",
        icon: <IconCheck />,
        message: `Supplier ${data.name} has been deleted.`,
      });
    },
  });
};

export const useSupplierCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newSupplier: Supplier) => {
      return (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier`,
          newSupplier
        )
      ).data as Supplier;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Supplier[]>(QUERY_KEYS.SUPPLIER, (old = []) => {
        return [...old, data]; // appends newly created supplier to list
      });
      notifications.show({
        title: "Create Successful",
        color: "green",
        icon: <IconCheck />,
        message: `New supplier ${data.name} of id: ${data.id} created!`,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error Creating Supplier",
        color: "red",
        icon: <IconX />,
        message: error.response.data.message,
      });
    },
  });
};

export const useSupplierUpdate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newSupplier: Supplier) => {
      return (
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier/${newSupplier.id}`,
          { name: newSupplier.name }
        )
      ).data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Supplier[]>(QUERY_KEYS.SUPPLIER, (old = []) => {
        const oldDataIndex = old.findIndex((sup) => sup.id === data.id);
        if (oldDataIndex === -1) return old;

        old[oldDataIndex] = { ...data }; // replaces old supplier info with newly updated supplier.
        return old;
      });
      notifications.show({
        title: "Update Successful",
        color: "green",
        icon: <IconCheck />,
        message: `Supplier ${data.name} of id: ${data.id} updated!`,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error Updating Supplier",
        color: "red",
        icon: <IconX />,
        message: error.response.data.message,
      });
    },
  });
};
