import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import DeleteActionButton from "../shared/DeleteActionButton";

interface SupplierTableProps {
  suppliers: Supplier[];
}

const SupplierTable = ({ suppliers }: SupplierTableProps) => {
  const rows = useMemo(
    () =>
      suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td width="15%">{supplier.id}</td>
          <td>{supplier.name}</td>
          <td width="10%">
            <Group position="right">
              <DeleteActionButton />
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
