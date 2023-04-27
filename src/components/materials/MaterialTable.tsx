import { Group, Table } from "@mantine/core";
import { useMemo } from "react";
import {
  TABLE_ACTIONS_WIDTH,
  TABLE_DATE_WIDTH,
  TABLE_ID_WIDTH,
  TABLE_MATERIAL_SUPPLIER_NAME_WIDTH,
} from "@/types/constants";
import { Material } from "@/types/types";
import { formatDate } from "../../util";
import DeleteActionButton from "../shared/DeleteActionButton";
import EditActionButton from "../shared/EditActionButton";
import ViewActionButton from "../shared/ViewActionButton";
interface MaterialTableProps {
  materials: Material[];
  onView(material: Material): void;
  onDelete(id?: number): void;
}

const MaterialTable = ({ materials, onView, onDelete }: MaterialTableProps) => {
  const rows = useMemo(
    () =>
      materials.map((material) => (
        <tr key={material.id}>
          <td width={TABLE_ID_WIDTH}>{material.id}</td>
          <td>{material.name}</td>
          <td width={TABLE_MATERIAL_SUPPLIER_NAME_WIDTH}>
            {material.supplier?.name}
          </td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(material.created_at)}</td>
          <td width={TABLE_DATE_WIDTH}>{formatDate(material.updated_at)}</td>
          <td width={TABLE_ACTIONS_WIDTH}>
            <Group position="right">
              <ViewActionButton onClick={() => onView(material)} />
              <EditActionButton
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <DeleteActionButton
                itemName={material.name}
                onDelete={() => onDelete(material.id)}
              />
            </Group>
          </td>
        </tr>
      )),
    [materials, onDelete]
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
          <th>Supplier Name</th>
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
