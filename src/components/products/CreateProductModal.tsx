import {
  ActionIcon,
  Grid,
  Group,
  Modal,
  NumberInput,
  Select,
  TextInput,
  Text,
  Button,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useMaterialGet } from "@/hooks/material";
import { useProductGet } from "@/hooks/product";
import LargeCreateButton from "../shared/LargeCreateButton";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";
import { randomId } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";

const CreateProductModal = () => {
  const [opened, setOpened] = useState(false);

  const { data: materials = [] } = useMaterialGet();
  const { data: products = [] } = useProductGet();

  const form = useForm({
    initialValues: {
      name: "",
      serving_size: undefined,
      serving_unit: "g",
      serving_per_package: 1,
      subproducts: [{ id: undefined, size: undefined, key: randomId() }],
      materials: [{ id: undefined, size: undefined, key: randomId() }],
    },

    validate: {
      name: isNotEmpty("Product name cannot be empty."),
      serving_size: isNotEmpty("Service size cannot be empty."),
      serving_unit: isNotEmpty("Service unit cannot be empty."),
      serving_per_package: isNotEmpty("Service per package cannot be empty."),
    },
  });

  type FormValues = typeof form.values;

  function handleClose() {
    setOpened(false);
    form.reset();
  }

  function getIngredientSelectData(target: string) {
    if (target === "subproducts") {
      return products.map((product) => {
        const val = product.id ? product.id.toString() : "";
        return { value: val, label: product.name };
      });
    }
    return materials.map((material) => {
      const val = material.id ? material.id.toString() : "";
      return { value: val, label: material.name };
    });
  }

  function renderIngredientsSelect(formValueTarget: string) {
    const values: any = form.values;
    return values[formValueTarget as keyof FormValues].map(
      (item: any, index: number) => (
        <Group key={item.key} mt="xs">
          <Grid sx={{ width: "100%" }}>
            <Grid.Col span={7}>
              <Select
                size="md"
                data={getIngredientSelectData(formValueTarget)}
                placeholder={
                  formValueTarget === "subproducts"
                    ? "Select Sub-Product"
                    : "Select Material"
                }
                nothingFound="No search results"
                searchable
                clearable
                transitionProps={{
                  transition: "scale-y",
                  duration: 150,
                  exitDuration: 80,
                  timingFunction: "ease",
                }}
                {...form.getInputProps(`${formValueTarget}.${index}.id`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                size="md"
                placeholder="Size (in g or ml)"
                min={1}
                {...form.getInputProps(`${formValueTarget}.${index}.size`)}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <ActionIcon
                variant="light"
                color="pink"
                size="lg"
                disabled={
                  values[formValueTarget as keyof FormValues].length <= 1
                }
                onClick={() => form.removeListItem(`${formValueTarget}`, index)}
              >
                <IconTrash size="1.25rem" />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Group>
      )
    );
  }

  function renderAddIngredientButton(formValueTarget: string) {
    return (
      <Button
        leftIcon={<IconPlus size={"1.25rem"} />}
        variant="light"
        sx={{ marginTop: 10 }}
        onClick={() =>
          form.insertListItem(`${formValueTarget}`, {
            name: undefined,
            active: undefined,
            key: randomId(),
          })
        }
      >
        {formValueTarget === "subproducts"
          ? "Add Sub-Products"
          : "Add Materials"}
      </Button>
    );
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
          <Group>
            <Grid sx={{ width: "100%" }}>
              <Grid.Col span={7}>
                <Text weight={500}>Sub-Products</Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text weight={500}>Size (in g or ml)</Text>
              </Grid.Col>
            </Grid>
          </Group>
          {renderIngredientsSelect("subproducts")}
          {renderAddIngredientButton("subproducts")}
        </Grid.Col>
        <Grid.Col span={12}>
          <Group>
            <Grid sx={{ width: "100%" }}>
              <Grid.Col span={7}>
                <Text weight={500}>Materials</Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text weight={500}>Size (in g or ml)</Text>
              </Grid.Col>
            </Grid>
          </Group>
          {renderIngredientsSelect("materials")}
          {renderAddIngredientButton("materials")}
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
