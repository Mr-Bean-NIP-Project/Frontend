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
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useMaterialGet } from "@/hooks/material";
import {
  useProductCreate,
  useProductGet,
  useProductUpdate,
} from "@/hooks/product";
import { ModalStateEnum } from "@/types/constants";
import { Product } from "@/types/types";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";

interface CreateUpdateProductModalProps {
  productToUpdate?: Product;
  modalState: ModalStateEnum;
  // use isModalOpen for opening and closing of this modal instead of modifying modal state
  isModalOpen: boolean;
  onClose(): void;
}

const SUBPRODUCTS_KEY = "sub_product_id_and_quantity";
const MATERIALS_KEY = "material_id_and_quantity";

const CreateUpdateProductModal = ({
  productToUpdate,
  modalState,
  isModalOpen,
  onClose,
}: CreateUpdateProductModalProps) => {
  const queryClient = useQueryClient();
  const { data: materials = [] } = useMaterialGet();
  const { data: products = [] } = useProductGet();

  const modalTitle =
    modalState === ModalStateEnum.Create ? "Create Product" : "Update Product";

  const submitButtonTitle =
    modalState === ModalStateEnum.Create ? "Create" : "Save";

  function transformIngredients(values: any, ingredientType: string) {
    if (ingredientType === "product") {
      return values[`${SUBPRODUCTS_KEY}`]
        .filter((item: any) => item.id && item.quantity)
        .map((item: any) => {
          return { product_id: Number(item.id), quantity: item.quantity };
        });
    }
    return values[`${MATERIALS_KEY}`]
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
      sub_product_id_and_quantity: [
        { id: undefined, quantity: 0, key: randomId() },
      ],
      material_id_and_quantity: [
        { id: undefined, quantity: 0, key: randomId() },
      ],
    },

    validate: {
      name: isNotEmpty("Product name cannot be empty."),
      serving_size: (value) =>
        value < 1 ? "Serving size cannot be less than 1." : null,
      serving_unit: (value) =>
        value !== "g" && value !== "ml"
          ? "Serving unit can only be g or ml."
          : null,
      serving_per_package: (value) =>
        value < 1 ? "Serving per package cannot be less than 1." : null,
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
  const updateMutation = useProductUpdate(queryClient);

  function handleClose() {
    onClose();
    form.reset();
  }

  const prepopulateFormFields = () => {
    if (productToUpdate && modalState === ModalStateEnum.Update) {
      let key: keyof typeof productToUpdate;
      for (key in productToUpdate) {
        form.setFieldValue(key, productToUpdate[key]);
      }
      // prepopulate subproducts
      (productToUpdate.product_sub_products ?? []).forEach((psp, index) => {
        form.insertListItem(
          SUBPRODUCTS_KEY,
          {
            id: psp.child.id?.toString(),
            quantity: psp.quantity,
            key: randomId(),
          },
          index
        );
      });
      if (
        productToUpdate.product_sub_products &&
        productToUpdate.product_sub_products.length > 0
      ) {
        // remove last empty row after prepopulating
        form.removeListItem(
          SUBPRODUCTS_KEY,
          productToUpdate.product_sub_products.length
        );
      }
      // prepopulate materials
      (productToUpdate.material_product ?? []).forEach((mp, index) => {
        form.insertListItem(
          MATERIALS_KEY,
          {
            id: mp.material_id.toString(),
            quantity: mp.material_quantity,
            key: randomId(),
          },
          index
        );
      });
      if (
        productToUpdate.material_product &&
        productToUpdate.material_product.length > 0
      ) {
        // remove last empty row after prepopulating
        form.removeListItem(
          MATERIALS_KEY,
          productToUpdate.material_product.length
        );
      }
    }
  };

  useEffect(() => prepopulateFormFields(), [productToUpdate, modalState]);

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
        handleClose();
      } catch (error: any) {
        notifications.show({
          title: "Error Creating Product",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    } else if (modalState === ModalStateEnum.Update && productToUpdate) {
      const valuesToUpdate: any = {};
      Object.keys(values).forEach((key) => {
        if (
          values[key as keyof FormValues] !==
          productToUpdate[key as keyof Product]
        ) {
          valuesToUpdate[key] = values[key as keyof FormValues];
        }
      });
      const payload = {
        id: productToUpdate?.id,
        ...valuesToUpdate,
      };

      try {
        const data = await updateMutation.mutateAsync(payload);
        notifications.show({
          title: "Update Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Product ${data.name} of id: ${data.id} updated!`,
        });
        handleClose();
      } catch (error: any) {
        notifications.show({
          title: "Error Updating Product",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    }
  }

  function getIngredientSelectData(targetKey: string) {
    if (targetKey === SUBPRODUCTS_KEY) {
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

  function renderIngredientsSelect(targetKey: string) {
    const values: any = form.values;
    return values[targetKey as keyof FormValues].map(
      (item: any, index: number) => (
        <Group key={item.key} mt="xs">
          <Grid sx={{ width: "100%" }}>
            <Grid.Col span={7}>
              <Select
                size="md"
                data={getIngredientSelectData(targetKey)}
                placeholder={
                  targetKey === SUBPRODUCTS_KEY
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
                {...form.getInputProps(`${targetKey}.${index}.id`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                precision={2} // 2dp
                size="md"
                placeholder="Size (in g or ml)"
                min={0}
                step={10}
                {...form.getInputProps(`${targetKey}.${index}.quantity`)}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <ActionIcon
                variant="light"
                color="pink"
                size="lg"
                disabled={values[targetKey as keyof FormValues].length <= 1}
                onClick={() => form.removeListItem(targetKey, index)}
              >
                <IconTrash size="1.25rem" />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Group>
      )
    );
  }

  function renderAddIngredientButton(targetKey: string) {
    return (
      <Button
        leftIcon={<IconPlus size={"1.25rem"} />}
        variant="light"
        sx={{ marginTop: 10 }}
        onClick={() =>
          form.insertListItem(`${targetKey}`, {
            name: undefined,
            active: undefined,
            key: randomId(),
          })
        }
      >
        {targetKey === SUBPRODUCTS_KEY ? "Add Sub-Products" : "Add Materials"}
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
            {...form.getInputProps("serving_unit")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            precision={2} // 2dp
            size="md"
            label="Serving per Package"
            min={0}
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
          {renderIngredientsSelect(SUBPRODUCTS_KEY)}
          {renderAddIngredientButton(SUBPRODUCTS_KEY)}
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
          {renderIngredientsSelect(MATERIALS_KEY)}
          {renderAddIngredientButton(MATERIALS_KEY)}
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
      title={modalTitle}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {createProductFields}
        <SubmitButtonInModal title={submitButtonTitle} />
      </form>
    </Modal>
  );
};

export default CreateUpdateProductModal;
