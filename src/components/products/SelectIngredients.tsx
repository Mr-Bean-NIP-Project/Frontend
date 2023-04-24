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

const SelectIngredients = () => {
  // const [ingredients, setIngredients] = useState([]);
  const [inputCount, setInputCount] = useState(1);

  const handleDelete = () => {
    if (inputCount > 1) {
      setInputCount(inputCount - 1);
    }
    // to change
  };

  const inputGroup = (
    <>
      <Grid sx={{ width: "100%" }}>
        <Grid.Col span={8}>
          <Select data={[]} size="md" placeholder="Ingredient Name" />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput size="md" placeholder="Size (g/ml)" min={1} />
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon
            variant="light"
            color="pink"
            size="lg"
            disabled={inputCount <= 1}
            onClick={handleDelete}
          >
            <IconTrash size="1.25rem" />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </>
  );

  const renderInputFields = () => {
    const allInputFields: JSX.Element[] = [];
    for (let i = 0; i < inputCount; i++) {
      allInputFields.push(<Box key={i}>{inputGroup}</Box>);
    }
    return allInputFields;
  };

  return (
    <Box>
      <Text weight={600} sx={{ marginBottom: 10 }}>
        Ingredients
      </Text>
      {renderInputFields()}
      <Button
        leftIcon={<IconPlus />}
        variant="light"
        sx={{ marginTop: 10 }}
        onClick={() => setInputCount(inputCount + 1)}
      >
        Add Ingredient
      </Button>
    </Box>
  );
};

export default SelectIngredients;
