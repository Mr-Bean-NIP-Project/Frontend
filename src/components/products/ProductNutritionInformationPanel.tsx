import { Table, createStyles, Text, Box } from "@mantine/core";
import { Nutrition } from "../../types/types";
import {
  NUTRITION,
  formatNutriText,
  formatNutriValue,
  isEmpty,
} from "../../util";
const useStyles = createStyles((theme) => ({
  nutrientTitle: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.gray[9],
  },
}));

interface ProductNutritionInformationPanelProps {
  per_serving: Nutrition | undefined;
  per_hundred: Nutrition | undefined;
  serving_unit: string;
}

export const ProductNutritionInformationPanel = ({
  per_serving,
  per_hundred,
  serving_unit,
}: ProductNutritionInformationPanelProps) => {
  const { classes } = useStyles();
  if (!per_serving || !per_hundred) return null;
  if (isEmpty(per_serving) && isEmpty(per_hundred)) return null;

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
    <Box style={{ marginBottom: rows.length > 0 ? 25 : 10 }}>
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
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td align="center" width={columnWidths[0]}>
              <Text weight={600} size="lg" />
            </td>
            <td align="center" width={columnWidths[1]}>
              <Text weight={600} size="lg">
                Per Serving
              </Text>
            </td>
            <td align="center" width={columnWidths[2]}>
              <Text weight={600} size="lg">
                {`Per 100${serving_unit}`}
              </Text>
            </td>
          </tr>
          {rows}
        </tbody>
      </Table>
    </Box>
  );

  return table;
};
