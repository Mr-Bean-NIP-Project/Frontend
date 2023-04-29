import { Modal, Table, Text, createStyles } from "@mantine/core";
import { ModalStateEnum } from "../../types/constants";
import { Product } from "../../types/types";
import DimmedMessage from "../shared/DimmedMessage";

const useStyles = createStyles((theme) => ({
  subProductTitle: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.gray[9],
  },
  materialTitle: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.gray[9],
  },
}));

interface ViewProductDetailModalProps {
  product: Product | undefined;
  modalState: ModalStateEnum;
  onClose(): void;
}

export const ViewProductDetailModal = ({
  product,
  modalState,
  onClose,
}: ViewProductDetailModalProps) => {
  const { classes } = useStyles();
  if (!product) return null;

  const subProductRows = (product.product_sub_products ?? []).map((psp) => (
    <tr key={psp.id}>
      <td width={"40%"}>
        <Text weight={500}>{psp.child.name}</Text>
      </td>
      <td align="right">
        <Text weight={500}>{psp.quantity}</Text>
      </td>
    </tr>
  ));
  const subProductTable = (
    <>
      <Text>Sub Products ({subProductRows.length})</Text>
      <Table
        withBorder
        withColumnBorders
        fontSize="md"
        horizontalSpacing="md"
        verticalSpacing="xs"
      >
        <colgroup>
          <col className={classes.subProductTitle} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <Text weight={500}>Name</Text>
            </td>
            <td align="right">
              <Text weight={500}>Quantity</Text>
            </td>
          </tr>
          {subProductRows}
        </tbody>
      </Table>
    </>
  );

  const subMaterialRows = (product.material_product ?? []).map((mp) => (
    <tr key={mp.id}>
      <td width={"40%"}>
        <Text weight={500}>{mp.material.name}</Text>
      </td>
      <td align="right">
        <Text weight={500}>{mp.material_quantity}</Text>
      </td>
    </tr>
  ));
  const subMaterialTable = (
    <>
      <Text>Materials ({subMaterialRows.length})</Text>
      <Table
        withBorder
        withColumnBorders
        fontSize="md"
        horizontalSpacing="md"
        verticalSpacing="xs"
      >
        <colgroup>
          <col className={classes.subProductTitle} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <Text weight={500}>Name</Text>
            </td>
            <td align="right">
              <Text weight={500}>Quantity</Text>
            </td>
          </tr>
          {subMaterialRows}
        </tbody>
      </Table>
    </>
  );

  const hasNoResult: boolean =
    subProductRows.length === 0 && subMaterialRows.length === 0;

  return (
    <>
      <Modal
        size="lg"
        opened={modalState === ModalStateEnum.View}
        onClose={() => onClose()}
        title={`#${product.id}: ${product.name}`}
      >
        {hasNoResult ? (
          <DimmedMessage
            title={"No SubProducts/Materials tagged!"}
            subtitle={"Click on the edit button to tag SubProducts/Materials"}
          />
        ) : null}
        {subProductRows.length > 0 ? subProductTable : null}
        {subMaterialRows.length > 0 ? subMaterialTable : null}
      </Modal>
    </>
  );
};
