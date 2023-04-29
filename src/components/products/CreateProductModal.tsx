import { Grid, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { useMaterialGet } from "@/hooks/material";
import { useProductGet } from "@/hooks/product";
import LargeCreateButton from "../shared/LargeCreateButton";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";
import SelectIngredients from "./SelectIngredients";

const CreateProductModal = () => {
  const [opened, setOpened] = useState(false);

  const { data: materials = [] } = useMaterialGet();
  const { data: products = [] } = useProductGet();
  const [subProductInputCount, setSubProductInputCount] = useState(1);
  const [materialInputCount, setMaterialInputCount] = useState(1);
  const [subProductIds, setSubProductIds] = useState([]);
  const [materialIds, setMaterialIds] = useState([]);

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
          <SelectIngredients
            ingredientType="product"
            ingredients={products}
            inputCount={subProductInputCount}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <SelectIngredients
            ingredientType="material"
            ingredients={materials}
            inputCount={materialInputCount}
          />
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
          <SubmitButtonInModal title="Create" />
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
