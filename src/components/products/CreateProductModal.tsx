import {
  Button,
  Grid,
  Modal,
  NumberInput,
  Select,
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
      name: "",
      serving_unit: "g",
      serving_per_package: 1,
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
            placeholder="Product Name"
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            size="md"
            label="Serving Size"
            placeholder="Serving Size"
            min={1}
            {...form.getInputProps("serving_size")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            size="md"
            data={["g", "ml"]}
            label="Serving Unit"
            defaultValue={"g"}
            {...form.getInputProps("unit")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            size="md"
            label="Serving per Package"
            min={1}
            {...form.getInputProps("serving_per_package")}
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
