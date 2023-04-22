import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import DeleteActionButton from "../shared/DeleteActionButton";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface SupplierTableProps {
  suppliers: Supplier[];
}

const SupplierTable = ({ suppliers }: SupplierTableProps) => {

  const handleDelete = (id: any) => {
    deleteSupplier(id);
  }

  async function deleteSupplier(id: any) {
    const response = await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`)
      .then((response) =>
        notifications.show({
          title: "Delete Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Supplier ${response.data.name} has been deleted.`,
        })
      )
      .catch((error) => {
        if (error.response) {
          notifications.show({
            title: "Error Deleting Supplier",
            color: "red",
            icon: <IconX />,
            message: error.response.data.message,
          });
        }
      });
  }

  const rows = useMemo(
    () =>
      suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td width="15%">{supplier.id}</td>
          <td>{supplier.name}</td>
          <td width="10%">
            <Group position="right">
              <DeleteActionButton itemName={supplier.name} onDelete={() => handleDelete(supplier.id)} />
            </Group>
          </td>
        </tr>
      )),
    [suppliers]
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
