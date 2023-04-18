import { Table } from "@mantine/core";
import { useMemo } from "react";

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
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default SupplierTable;
