import {
  Badge,
  Box,
  Group,
  Modal,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import { ModalStateEnum } from "../../types/constants";
import { Product } from "../../types/types";
import DimmedMessage from "../shared/DimmedMessage";

interface ViewProductDetailModalProps {
  product: Product | undefined;
  modalState: ModalStateEnum;
  onClose(): void;
}

const NAME_WIDTH = "75%";

export const ViewProductDetailModal = ({
  product,
  modalState,
  onClose,
}: ViewProductDetailModalProps) => {
  if (!product) return null;

  const tableHeaders = (
    <tr>
      <th>
        <Text weight={600} color="dark">
          Name
        </Text>
      </th>
      <th align="right">
        <Text weight={600} color="dark" align="right">
          Quantity (in g or ml)
        </Text>
      </th>
    </tr>
  );

  const subProductRows = (product.product_sub_products ?? []).map((psp) => (
    <tr key={psp.id}>
      <td width={NAME_WIDTH}>{psp.child.name}</td>
      <td align="right">{psp.quantity}</td>
    </tr>
  ));

  const subMaterialRows = (product.material_product ?? []).map((mp) => (
    <tr key={mp.id}>
      <td width={NAME_WIDTH}>{mp.material.name}</td>
      <td align="right">{mp.material_quantity}</td>
    </tr>
  ));

  const subProductTable = (
    <Box style={{ marginBottom: subMaterialRows.length > 0 ? 25 : 10 }}>
      <Group position="left" align="inherit">
        <Text weight={600} size="lg" style={{ marginBottom: 10 }}>
          Sub-Products
        </Text>
        <Badge size="lg" style={{ marginLeft: -5 }}>
          {subProductRows.length}
        </Badge>
      </Group>
      <Table
        striped
        withBorder
        withColumnBorders
        fontSize="md"
        horizontalSpacing="md"
        verticalSpacing="xs"
      >
        <thead>{tableHeaders}</thead>
        <tbody>{subProductRows}</tbody>
      </Table>
    </Box>
  );

  const subMaterialTable = (
    <Box style={{ marginBottom: 10 }}>
      <Group position="left" align="inherit">
        <Text weight={600} size="lg" style={{ marginBottom: 10 }}>
          Materials
        </Text>
        <Badge size="lg" style={{ marginLeft: -5 }}>
          {subMaterialRows.length}
        </Badge>
      </Group>
      <Table
        striped
        withBorder
        withColumnBorders
        fontSize="md"
        horizontalSpacing="md"
        verticalSpacing="xs"
      >
        <thead>{tableHeaders}</thead>
        <tbody>{subMaterialRows}</tbody>
      </Table>
    </Box>
  );

  const hasNoResult: boolean =
    subProductRows.length === 0 && subMaterialRows.length === 0;

  return (
    <>
      <Modal
        size="xl"
        opened={modalState === ModalStateEnum.View}
        onClose={() => onClose()}
        title={`#${product.id}: ${product.name}`}
      >
        {hasNoResult ? (
          <DimmedMessage
            title={"No sub-products or materials tagged"}
            subtitle={"Edit this product to tag sub-products or materials!"}
          />
        ) : null}
        {subProductRows.length > 0 ? subProductTable : null}
        {subMaterialRows.length > 0 ? subMaterialTable : null}
      </Modal>
    </>
  );
};
