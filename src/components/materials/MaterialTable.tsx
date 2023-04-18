import { Button, Table } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";

import { useMemo } from "react";
import ViewMaterialDetailModal from "./ViewMaterialDetailModal";

interface MaterialTableProps {
  materials: Material[];
}

const MaterialTable = ({ materials }: MaterialTableProps) => {
  const rows = useMemo(
    () =>
      materials.map((material) => (
        <tr key={material.id}>
          <td width="15%">{material.id}</td>
          <td>{material.name}</td>
          <td width="10%">
            <ViewMaterialDetailModal material={material} />
          </td>
        </tr>
      )),
    [materials]
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
          <th>Material ID</th>
          <th>Material Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default MaterialTable;
