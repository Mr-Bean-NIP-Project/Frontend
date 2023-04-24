import { Group, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { Supplier } from "@/types/types";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit(supplierToUpdate?: Supplier): void;
  onDelete(id?: number): void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  const queryClient = useQueryClient();

  const rows = useMemo(
    () =>
      suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td width="15%">{supplier.id}</td>
          <td>{supplier.name}</td>
          <td width="10%">
            <Group position="right">
              <EditActionButton onClick={() => onEdit(supplier)} />
              <DeleteActionButton
                itemName={supplier.name}
                onDelete={() => onDelete(supplier.id)}
              />
            </Group>
          </td>
        </tr>
      )),
    [suppliers, onDelete, onEdit]
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
