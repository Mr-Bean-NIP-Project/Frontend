import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import { Product } from "@/types/types";
import DeleteActionButton from "../shared/DeleteActionButton";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const rows = useMemo(
    () =>
      products.map((product) => (
        <tr key={product.id}>
          <td width="15%">{product.id}</td>
          <td>{product.name}</td>
          <td width="10%">
            <Group position="right">
              {product.serving_size} {product.serving_unit}
            </Group>
          </td>
          <td width="10%">
            <Group position="right">
              <DeleteActionButton
                onDelete={function (): void {
                  throw new Error("Function not implemented.");
                }}
                itemName={""}
              />
            </Group>
          </td>
        </tr>
      )),
    [products]
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
          <th>Product ID</th>
          <th>Product Name</th>
          <th>
            <Group position="right">Serving Size</Group>
          </th>
          <th>
            <Group position="right">Actions</Group>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ProductTable;
