import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import {
  TABLE_ACTIONS_WIDTH,
  TABLE_DATE_WIDTH,
  TABLE_ID_WIDTH,
} from "@/types/constants";
import { Product } from "@/types/types";
import { formatDate } from "../../util";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";
import ViewActionButton from "../shared/ViewActionButton";
import { ProductActionsButton } from "./ProductActionsButton";

interface ProductTableProps {
  products: Product[];
  onDelete(id?: number): void;
  onView(product: Product): void;
  onEdit(product: Product): void;
  onDownloadNip(product: Product): void;
}

const ProductTable = ({
  products,
  onDelete,
  onView,
  onEdit,
  onDownloadNip,
}: ProductTableProps) => {
  const rows = useMemo(
    () =>
      products.map((product) => (
        <tr key={product.id}>
          <td width={TABLE_ID_WIDTH}>{product.id}</td>
          <td>{product.name}</td>
          <td width="10%">
            <Group position="right">
              {product.serving_size} {product.serving_unit}
            </Group>
          </td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(product.created_at)}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(product.updated_at)}</td>
          <td width={TABLE_ACTIONS_WIDTH}>
            <Group position="right">
              <ProductActionsButton
                onDownload={() => onDownloadNip(product)}
                onView={() => onView(product)}
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product.id)}
                itemName={product.name}
              />
              {/* <ViewActionButton onClick={() => onView(product)} />
              <EditActionButton onClick={() => onEdit(product)} />
              <DeleteActionButton
                onDelete={() => onDelete(product.id)}
                itemName={product.name}
              /> */}
            </Group>
          </td>
        </tr>
      )),
    [products, onDelete, onView, onEdit]
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

export default ProductTable;
