import { useMaterialGet } from "@/hooks/material";
import { useProductGet } from "@/hooks/product";
import { Material, Product } from "@/types/types";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  NumberInput,
  Select,
  Text,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface SelectIngredientsProp {
  ingredientType: string; //product or material
  ingredients: Product[] | Material[];
  inputCount: number;
}

const SelectIngredients = ({
  ingredientType,
  ingredients,
  inputCount,
}: SelectIngredientsProp) => {
  const headerText =
    ingredientType === "product" ? "Sub-Products" : "Materials";

  const addButtonText =
    ingredientType === "product" ? "Add Sub-Product" : "Add Material";

  function getIngredientsSelectData() {
    if (!ingredients) return null;
    return ingredients.map((ingredient) => {
      const val = ingredient.id ? ingredient.id.toString() : "";
      return { value: val, label: ingredient.name };
    });
  }

  const inputGroup = (
    <>
      <Grid sx={{ width: "100%" }}>
        <Grid.Col span={7}>
          <Select
            size="md"
            data={getIngredientsSelectData() ?? []}
            placeholder={
              ingredientType === "product"
                ? "Select Sub-Product"
                : "Select Material"
            }
            nothingFound={`No matching ${ingredientType}s found`}
            searchable
            clearable
            transitionProps={{
              transition: "scale-y",
              duration: 150,
              exitDuration: 80,
              timingFunction: "ease",
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput size="md" placeholder="Quantity (in g or ml)" min={1} />
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon
            variant="light"
            color="pink"
            size="lg"
            disabled={inputCount <= 1}
          >
            <IconTrash size="1.25rem" />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </>
  );

  const renderInputFields = () => {
    const inputFields: JSX.Element[] = [];
    for (let i = 0; i < inputCount; i++) {
      inputFields.push(
        <Box key={`${ingredientType}_${i + 1}`}>{inputGroup}</Box>
      );
    }
    return inputFields;
  };

  return (
    <Box style={{ marginBottom: 10 }}>
      <Text weight={600} sx={{ marginBottom: 10 }}>
        {headerText}
      </Text>
      {renderInputFields()}
      <Button
        leftIcon={<IconPlus size={"1.25rem"} />}
        variant="light"
        sx={{ marginTop: 10 }}
      >
        {addButtonText}
      </Button>
    </Box>
  );
};

export default SelectIngredients;
