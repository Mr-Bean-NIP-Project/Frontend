import { Group, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";

interface SupplierTableProps {
  suppliers: Supplier[];
}

const SupplierTable = ({ suppliers }: SupplierTableProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: any) => {
      return (
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`)
      ).data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      notifications.show({
        title: "Delete Successful",
        color: "green",
        icon: <IconCheck />,
        message: `Supplier ${data.name} has been deleted.`,
      });
    },
  });

  const handleDelete = useCallback(
    (id: any) => {
      mutation.mutate(id);
    },
    [mutation]
  );

  const rows = useMemo(
    () =>
      suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td width="15%">{supplier.id}</td>
          <td>{supplier.name}</td>
          <td width="10%">
            <Group position="right">
              <DeleteActionButton
                itemName={supplier.name}
                onDelete={() => handleDelete(supplier.id)}
              />
              <EditActionButton
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Group>
          </td>
        </tr>
      )),
    [suppliers, handleDelete]
  );

  return (
    <Table
      withBorder
      withColumnBorders
      striped
      fontSize="md"
      horizontalSpacing="md"
      verticalSpacing="sm"
    >
      <thead>
        <tr>
          <th>Supplier ID</th>
          <th>Supplier Name</th>
          <th>
            <Group position="right">Actions</Group>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default SupplierTable;
