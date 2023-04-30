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

export const MaterialNutritionInformationPanel = (
  data: Nutrition | undefined
) => {
  const { classes } = useStyles();
  if (!data) return null;

  const rows = Object.keys(data).map((key) => (
    <tr key={key}>
      <td width={"40%"}>
        <Text weight={500}>{formatNutriText(key)}</Text>
      </td>
      <td align="right">
        {formatNutriValue(key as NUTRITION, (data as any)[key], 100)}
      </td>
    </tr>
  ));

  const table = (
    <Box style={{ marginBottom: 5 }}>
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
        <tbody>
          <tr>
            <td align="center">
              <Text />
            </td>
            <td align="center">
              <Text weight={600}>Per 100 g or ml</Text>
            </td>
          </tr>
          {rows}
        </tbody>
      </Table>
    </Box>
  );

  return table;
};
