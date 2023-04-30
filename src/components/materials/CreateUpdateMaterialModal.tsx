import {
  Grid,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
  Text,
  Group,
} from "@mantine/core";
import { TransformedValues, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useMaterialCreate, useMaterialUpdate } from "@/hooks/material";
import { useSupplierGet } from "@/hooks/supplier";
import { ModalStateEnum } from "@/types/constants";
import { Material } from "@/types/types";
import {
  NUTRITION,
  NUTRITION_DP,
  divideNutriValue,
  formatNutriText,
  formatNutriValue,
} from "../../util";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";

interface CreateUpdateMaterialModalProps {
  materialToUpdate?: Material;
  modalState: ModalStateEnum;
  // use isModalOpen for opening and closing of this modal instead of modifying modal state
  isModalOpen: boolean;
  onClose(): void;
}

const CreateUpdateMaterialModal = ({
  materialToUpdate,
  modalState,
  isModalOpen,
  onClose,
}: CreateUpdateMaterialModalProps) => {
  const queryClient = useQueryClient();
  const { data: suppliers = [] } = useSupplierGet();

  const modalTitle =
    modalState === ModalStateEnum.Create
      ? "Create Material"
      : "Update Material";

  const submitButtonTitle =
    modalState === ModalStateEnum.Create ? "Create" : "Save";

  const form = useForm({
    initialValues: {
      name: "",
      supplier_id: "",
      energy: 0,
      protein: 0,
      total_fat: 0,
      saturated_fat: 0,
      trans_fat: 0,
      cholesterol: 0,
      carbohydrate: 0,
      sugars: 0,
      dietary_fibre: 0,
      sodium: 0,
    },

    transformValues: (values) => ({
      name: values.name,
      supplier_id: Number(values.supplier_id),
      energy: divideNutriValue(NUTRITION.ENERGY, values.energy),
      protein: divideNutriValue(NUTRITION.PROTEIN, values.protein),
      total_fat: divideNutriValue(NUTRITION.TOTAL_FAT, values.total_fat),
      saturated_fat: divideNutriValue(
        NUTRITION.SATURATED_FAT,
        values.saturated_fat
      ),
      trans_fat: divideNutriValue(NUTRITION.TRANS_FAT, values.trans_fat),
      cholesterol: divideNutriValue(NUTRITION.CHOLESTEROL, values.cholesterol),
      carbohydrate: divideNutriValue(
        NUTRITION.CARBOHYDRATE,
        values.carbohydrate
      ),
      sugars: divideNutriValue(NUTRITION.SUGARS, values.sugars),
      dietary_fibre: divideNutriValue(
        NUTRITION.DIETARY_FIBRE,
        values.dietary_fibre
      ),
      sodium: divideNutriValue(NUTRITION.SODIUM, values.sodium),
    }),

    validate: {
      name: isNotEmpty("Material name cannot be empty."),
      supplier_id: isNotEmpty("Supplier cannot be empty."),
    },
  });

  type FormValues = typeof form.values;

  const prepopulateFormFields = () => {
    if (materialToUpdate && modalState === ModalStateEnum.Update) {
      form.setFieldValue("name", materialToUpdate.name ?? "");
      form.setFieldValue(
        "supplier_id",
        materialToUpdate.supplier?.id?.toString() ?? ""
      );
      Object.values(NUTRITION).forEach((val) =>
        form.setFieldValue(
          val,
          Number(formatNutriValue(val, materialToUpdate[val], 100))
        )
      );
    }
  };

  useEffect(() => prepopulateFormFields(), [materialToUpdate, modalState]);

  const createMutation = useMaterialCreate(queryClient);
  const updateMutation = useMaterialUpdate(queryClient);

  function handleClose() {
    onClose();
    form.reset();
  }

  async function handleSubmit(values: TransformedValues<typeof form>) {
    if (modalState === ModalStateEnum.Create) {
      const newMaterial: Material = {
        ...values,
      };
      try {
        const data = await createMutation.mutateAsync(newMaterial);
        notifications.show({
          title: "Create Successful",
          color: "green",
          icon: <IconCheck />,
          message: `New Material ${data.name} of id: ${data.id} created!`,
        });
        handleClose();
      } catch (error: any) {
        notifications.show({
          title: "Error Creating Material",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    } else if (modalState === ModalStateEnum.Update && materialToUpdate) {
      const valuesToUpdate: any = {};
      Object.keys(form.values).forEach((key) => {
        if (
          values[key as keyof FormValues] !==
          materialToUpdate[key as keyof Material]
        ) {
          valuesToUpdate[key] = values[key as keyof FormValues];
        }
      });
      const payload = {
        id: materialToUpdate?.id,
        ...valuesToUpdate,
      };

      try {
        const data = await updateMutation.mutateAsync(payload);
        notifications.show({
          title: "Update Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Material ${data.name} of id: ${data.id} updated!`,
        });
        handleClose();
      } catch (error: any) {
        notifications.show({
          title: "Error Updating Material",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    }
  }

  const nutritionalFields: JSX.Element[] = [];
  Object.values(NUTRITION).forEach((nutrient) => {
    const nutriText = formatNutriText(nutrient);
    nutritionalFields.push(
      <tr key={nutrient}>
        <td>{nutriText}</td>
        <td>
          <Group position="right">
            <NumberInput
              precision={NUTRITION_DP[nutrient]}
              key={nutrient}
              placeholder={nutriText}
              size="sm"
              min={0}
              step={10}
              sx={{
                width: "50%",
                input: { textAlign: "right", paddingRight: "2.25rem" },
              }}
              {...form.getInputProps(nutrient)}
            />
          </Group>
        </td>
      </tr>
    );
  });

  function getSupplierSelectData() {
    return suppliers.map((supplier) => {
      const val = supplier.id ? supplier.id.toString() : "";
      // Select component only accepts value in string
      return { value: val, label: supplier.name };
    });
  }

  const materialFields = (
    <>
      <Grid gutter="md">
        <Grid.Col span={12}>
          <TextInput
            size="md"
            label="Material Name"
            placeholder="Material Name"
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            size="md"
            data={getSupplierSelectData()}
            label="Supplier"
            placeholder="Select Supplier"
            nothingFound="No matching suppliers found"
            searchable
            clearable
            transitionProps={{
              transition: "scale-y",
              duration: 150,
              exitDuration: 80,
              timingFunction: "ease",
            }}
            {...form.getInputProps("supplier_id")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Text weight={500}>Nutritional Information per 100 (g or ml)</Text>
          <Table>
            <tbody>{nutritionalFields}</tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </>
  );

  return (
    <>
      <Modal
        size="xl"
        opened={isModalOpen}
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={handleClose}
        title={modalTitle}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          {materialFields}
          <SubmitButtonInModal title={submitButtonTitle} />
        </form>
      </Modal>
    </>
  );
};

export default CreateUpdateMaterialModal;
