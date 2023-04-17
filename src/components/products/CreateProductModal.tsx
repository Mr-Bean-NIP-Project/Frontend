import {
  Button,
  Grid,
  Modal,
  NativeSelect,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useState } from "react";
import SelectIngredients from "./SelectIngredients";

const CreateProductModal = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      productName: "",
      servingSize: 100,
      unit: "g",
      servingPerPackage: 1,
      ingredients: [],
    },

    validate: {},
  });

  const createProductFields = (
    <>
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TextInput
            size="md"
            label="Product Name"
            {...form.getInputProps("productName")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            size="md"
            label="Serving Size"
            min={1}
            {...form.getInputProps("servingSize")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NativeSelect
            size="md"
            data={["g", "ml"]}
            label="Unit"
            {...form.getInputProps("unit")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            size="md"
            label="Serving per Package"
            min={1}
            {...form.getInputProps("servingPerPackage")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <SelectIngredients />
        </Grid.Col>
      </Grid>
    </>
  );

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Product"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {createProductFields}
          <Button fullWidth size="md" sx={{ marginTop: 20 }}>
            Create
          </Button>
        </form>
      </Modal>

      <Button size="lg" leftIcon={<IconPlus />} onClick={() => setOpened(true)}>
        Create Product
      </Button>
    </>
  );
};

export default CreateProductModal;
