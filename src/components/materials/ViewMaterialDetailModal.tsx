import { Button, Modal, Table, Text } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";
import { useState } from "react";
import { formatNutriText, formatText } from "../../../util";

interface ViewMaterialDetailModalProps {
  material: Material;
}

const ViewMaterialDetailModal = ({
  material,
}: ViewMaterialDetailModalProps) => {
  const [opened, setOpened] = useState(false);

  const rows = Object.keys(material).map((key) => (
    <tr key={key}>
      <td>
        <Text weight={500}>{formatNutriText(key)}</Text>
      </td>
      <td>{material[key as keyof Material]}</td>
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
      <tbody>{rows}</tbody>
    </Table>
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        radius="md"
        leftIcon={<IconNotes size={"1.25rem"} />}
        onClick={() => setOpened(true)}
        sx={{ border: "1.5px solid" }}
      >
        View
      </Button>

      <Modal
        size="lg"
        opened={opened}
        onClose={() => setOpened(false)}
        title={`${material.name}`}
      >
        {nutriTable}
      </Modal>
    </>
  );
};

export default ViewMaterialDetailModal;
