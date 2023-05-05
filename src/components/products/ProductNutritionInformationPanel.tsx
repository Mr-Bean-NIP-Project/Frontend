import { Box, Table, Text } from "@mantine/core";
import { Nutrition } from "../../types/types";
import { NUTRITION, formatNutriText, formatNutriValue } from "../../util";
interface ProductNutritionInformationPanelProps {
  per_serving: Nutrition | undefined;
  per_hundred: Nutrition | undefined;
  serving_unit: string;
  toShow: boolean;
  NIPClass: { nutrientTitle: string };
}

export const ProductNutritionInformationPanel = ({
  per_serving,
  per_hundred,
  serving_unit,
  toShow,
  NIPClass,
}: ProductNutritionInformationPanelProps) => {
  if (!per_serving || !per_hundred || !toShow) return null;

  const columnWidths = ["40%", "30%", "30%"];
  const rows = Object.keys(per_serving).map((key) => (
    <tr key={key}>
      <td width={columnWidths[0]}>
        <Text weight={500}>{formatNutriText(key)}</Text>
      </td>
      <td align="right" width={columnWidths[1]}>
        {formatNutriValue(key as NUTRITION, (per_serving as any)[key])}
      </td>
      <td align="right" width={columnWidths[2]}>
        {formatNutriValue(key as NUTRITION, (per_hundred as any)[key])}
      </td>
    </tr>
  ));

  const table = (
    <Box style={{ marginBottom: 25 }}>
      <Table
        withBorder
        withColumnBorders
        fontSize="md"
        horizontalSpacing="md"
        verticalSpacing="xs"
      >
        <colgroup>
          <col className={NIPClass.nutrientTitle} />
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td align="center" width={columnWidths[0]}>
              <Text />
            </td>
            <td align="center" width={columnWidths[1]}>
              <Text weight={600}>Per Serving</Text>
            </td>
            <td align="center" width={columnWidths[2]}>
              <Text weight={600}>{`Per 100 ${serving_unit}`}</Text>
            </td>
          </tr>
          {rows}
        </tbody>
      </Table>
    </Box>
  );

  return table;
};
