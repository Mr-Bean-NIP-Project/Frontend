import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import {
  TABLE_ACTIONS_WIDTH,
  TABLE_DATE_WIDTH,
  TABLE_ID_WIDTH,
} from "@/types/constants";
import { Material } from "@/types/types";
import { formatDate } from "../../../util";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";
interface MaterialTableProps {
  materials: Material[];
}

const MaterialTable = ({ materials }: MaterialTableProps) => {
  const rows = useMemo(
    () =>
      materials.map((material) => (
        <tr key={material.id}>
          <td width={TABLE_ID_WIDTH}>{material.id}</td>
          <td>{material.name}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(material.created_at)}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(material.updated_at)}</td>
          <td width={TABLE_ACTIONS_WIDTH}>
            <Group position="right">
              <EditActionButton
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
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

export default MaterialTable;
