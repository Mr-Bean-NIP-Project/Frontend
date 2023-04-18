import {
  Button,
  Grid,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import SelectIngredients from "./SelectIngredients";
import LargeCreateButton from "../shared/LargeCreateButton";
import CreateButtonInModal from "../shared/CreateButtonInModal";

const CreateProductModal = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      serving_size: undefined,
      serving_unit: "g",
      serving_per_package: 1,
      ingredients: [],
    },

    validate: {
      name: isNotEmpty("Product name cannot be empty."),
      serving_size: isNotEmpty("Service size cannot be empty."),
      serving_unit: isNotEmpty("Service unit cannot be empty."),
      serving_per_package: isNotEmpty("Service per package cannot be empty."),
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
  }

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
            transitionProps={{
              transition: "scale-y",
              duration: 150,
              exitDuration: 80,
              timingFunction: "ease",
            }}
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
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={handleClose}
        title="Create Product"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {createProductFields}
          <CreateButtonInModal />
        </form>
      </Modal>

      <LargeCreateButton
        title="Create Product"
        onClick={() => setOpened(true)}
      />
    </>
  );
};

export default CreateProductModal;
