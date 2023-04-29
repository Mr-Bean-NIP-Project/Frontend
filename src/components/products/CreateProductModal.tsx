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
import { TransformedValues, isNotEmpty, useForm } from "@mantine/form";
import { useMaterialGet } from "@/hooks/material";
import { useProductCreate, useProductGet } from "@/hooks/product";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { ModalStateEnum } from "@/types/constants";
import { useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import { Product } from "@/types/types";

interface CreateProductModalProps {
  modalState: ModalStateEnum;
  // use isModalOpen for opening and closing of this modal instead of modifying modal state
  isModalOpen: boolean;
  onClose(): void;
}

const CreateProductModal = ({
  modalState,
  isModalOpen,
  onClose,
}: CreateProductModalProps) => {
  const queryClient = useQueryClient();
  const { data: materials = [] } = useMaterialGet();
  const { data: products = [] } = useProductGet();

  function transformIngredients(values: any, ingredientType: string) {
    if (ingredientType === "product") {
      return values.subproducts
        .filter((item: any) => item.id && item.quantity)
        .map((item: any) => {
          return { product_id: Number(item.id), quantity: item.quantity };
        });
    }
    return values.materials
      .filter((item: any) => item.id && item.quantity)
      .map((item: any) => {
        return { material_id: Number(item.id), quantity: item.quantity };
      });
  }

  const form = useForm({
    initialValues: {
      name: "",
      serving_size: 0,
      serving_unit: "g",
      serving_per_package: 1,
      subproducts: [{ id: undefined, quantity: 0, key: randomId() }],
      materials: [{ id: undefined, quantity: 0, key: randomId() }],
    },

    validate: {
      name: isNotEmpty("Product name cannot be empty."),
      serving_size: isNotEmpty("Service size cannot be empty."),
      serving_unit: isNotEmpty("Service unit cannot be empty."),
      serving_per_package: isNotEmpty("Service per package cannot be empty."),
    },

    transformValues: (values) => ({
      name: values.name,
      serving_size: values.serving_size,
      serving_unit: values.serving_unit,
      serving_per_package: values.serving_per_package,
      sub_product_id_and_quantity: transformIngredients(values, "product"),
      material_id_and_quantity: transformIngredients(values, "material"),
    }),
  });

  type FormValues = typeof form.values;

  const createMutation = useProductCreate(queryClient);

  function handleClose() {
    onClose();
    form.reset();
  }

  async function handleSubmit(values: TransformedValues<typeof form>) {
    if (modalState === ModalStateEnum.Create) {
      const newProduct: Product = {
        ...values,
      };
      try {
        const data = await createMutation.mutateAsync(newProduct);
        notifications.show({
          title: "Create Successful",
          color: "green",
          icon: <IconCheck />,
          message: `New Product ${data.name} of id: ${data.id} created!`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Creating Product",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    }
    handleClose();
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
                maxDropdownHeight={300}
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
                step={10}
                {...form.getInputProps(`${formValueTarget}.${index}.quantity`)}
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
            label="Serving Size (in g or ml)"
            placeholder="Serving Size (in g or ml)"
            min={1}
            step={10}
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
    <Modal
      size="xl"
      opened={isModalOpen}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={handleClose}
      title="Create Product"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {createProductFields}
        <SubmitButtonInModal title="Create" />
      </form>
    </Modal>
  );
};

export default CreateProductModal;
