import { Modal, Table, Text, createStyles } from "@mantine/core";
import { useState } from "react";
import { formatNutriText } from "../../../util";
import ViewActionButton from "./ViewActionButton";

const useStyles = createStyles((theme) => ({
  nutrientTitle: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.gray[9],
  },
}));
interface ViewMaterialDetailModalProps {
  material: Material;
}

const ViewMaterialDetailModal = ({
  material,
}: ViewMaterialDetailModalProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const rows = Object.keys(material)
    .filter((key) => key !== "name" && key !== "id")
    .map((key) => (
      <tr key={key}>
        <td width={"40%"}>
          <Text weight={500}>{formatNutriText(key)}</Text>
        </td>
        <td align="right">{material[key as keyof Material]}</td>
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
      <ViewActionButton onClick={() => setOpened(true)} />
      <Modal
        size="lg"
        opened={opened}
        onClose={() => setOpened(false)}
        title={`#${material.id}: ${material.name}`}
      >
        {nutriTable}
      </Modal>
    </>
  );
};

export default ViewMaterialDetailModal;
