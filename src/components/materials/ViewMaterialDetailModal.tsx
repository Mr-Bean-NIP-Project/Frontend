import { Modal, Table, Text, createStyles } from "@mantine/core";
import { Material } from "@/types/types";
import { NUTRITION, formatNutriText, formatNutriValue } from "../../util";
import { ModalStateEnum } from "../../types/constants";

const useStyles = createStyles((theme) => ({
  nutrientTitle: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.gray[9],
  },
}));
interface ViewMaterialDetailModalProps {
  material: Material | undefined;
  modalState: ModalStateEnum;
  onClose(): void;
}

const ViewMaterialDetailModal = ({
  material,
  modalState,
  onClose,
}: ViewMaterialDetailModalProps) => {
  const { classes } = useStyles();
  if (!material) return null;

  const rows = Object.keys(material)
    .filter((key) => Object.values(NUTRITION).includes(key as NUTRITION))
    .map((key) => (
      <tr key={key}>
        <td width={"40%"}>
          <Text weight={500}>{formatNutriText(key)}</Text>
        </td>
        <td align="right">
          {formatNutriValue(key as NUTRITION, (material as any)[key])}
        </td>
      </tr>
    ));

  const nutriTable = (
    <Table
      withBorder
      withColumnBorders
      fontSize="md"
      horizontalSpacing="md"
      verticalSpacing="xs"
    >
      <colgroup>
        <col className={classes.nutrientTitle} />
        <col />
      </colgroup>
      <tbody>{rows}</tbody>
    </Table>
  );

  return (
    <>
      <Modal
        size="lg"
        opened={modalState === ModalStateEnum.View}
        onClose={onClose}
        title={`#${material.id}: ${material.name}`}
      >
        <Text weight={600} style={{ marginBottom: 10 }}>
          Nutrition Information per 100 (g or ml)
        </Text>
        {nutriTable}
      </Modal>
    </>
  );
};

export default ViewMaterialDetailModal;
