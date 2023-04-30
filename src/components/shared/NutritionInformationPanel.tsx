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

export const NutritionInformationTable = (
  data: Nutrition | undefined,
  title: string = "Nutrition"
) => {
  const { classes } = useStyles();
  if (!data) return null;
  if (isEmpty(data)) return null;

  const rows = Object.keys(data).map((key) => (
    <tr key={key}>
      <td width={"40%"}>
        <Text weight={500}>{formatNutriText(key)}</Text>
      </td>
      <td align="right">
        {formatNutriValue(key as NUTRITION, (data as any)[key])}
      </td>
    </tr>
  ));

  const table = (
    <Box style={{ marginBottom: rows.length > 0 ? 25 : 10 }}>
      <Text weight={600} size="lg" style={{ marginBottom: 10 }}>
        {title}
      </Text>
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
    </Box>
  );

  return table;
};