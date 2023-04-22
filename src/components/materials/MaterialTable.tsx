import { Group, Table, createStyles } from "@mantine/core";
import { useMemo } from "react";
import DeleteActionButton from "../shared/DeleteActionButton";
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
            <Group position="right">
              <DeleteActionButton />
            </Group>
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
          <th>
            <Group position="right">Actions</Group>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default MaterialTable;
