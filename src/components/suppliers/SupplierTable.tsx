import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import {
  TABLE_ACTIONS_WIDTH,
  TABLE_DATE_WIDTH,
  TABLE_ID_WIDTH,
} from "@/types/constants";
import { Supplier } from "@/types/types";
import { formatDate } from "../../util";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";
interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit(supplierToUpdate?: Supplier): void;
  onDelete(id?: number): void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  const rows = useMemo(
    () =>
      suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td width={TABLE_ID_WIDTH}>{supplier.id}</td>
          <td>{supplier.name}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(supplier.created_at)}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(supplier.updated_at)}</td>
          <td width={TABLE_ACTIONS_WIDTH}>
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
          <th>Date Created</th>
          <th>Date Updated</th>
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
