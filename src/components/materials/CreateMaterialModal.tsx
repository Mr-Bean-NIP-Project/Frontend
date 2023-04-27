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
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { ColumnArgument, Supplier } from "@/types/types";
import { NUTRITION, NUTRITION_DP, formatNutriText } from "../../../util";
import LargeCreateButton from "../shared/LargeCreateButton";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";
import { useSupplierGet } from "@/hooks/supplier";

const CreateMaterialModal = () => {
  const [opened, setOpened] = useState(false);

  const { data: suppliers = [] } = useSupplierGet();

  const nutriValues: ColumnArgument = {};
  Object.values(NUTRITION).forEach((val) => (nutriValues[val] = 0));

  const form = useForm({
    initialValues: {
      name: "",
      supplier: undefined,
      ...nutriValues,
    },

    validate: {
      name: isNotEmpty("Material name cannot be empty."),
      supplier: isNotEmpty("Supplier cannot be empty."),
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
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

  const createMaterialFields = (
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
            data={suppliers.map((supplier) => supplier.name)}
            label="Supplier"
            placeholder="Select Supplier"
            nothingFound="No supplier found"
            searchable
            clearable
            transitionProps={{
              transition: "scale-y",
              duration: 150,
              exitDuration: 80,
              timingFunction: "ease",
            }}
            {...form.getInputProps("supplier")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Text weight={500}>Nutritional Information</Text>
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
        opened={opened}
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={handleClose}
        title="Create Material"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {createMaterialFields}
          <SubmitButtonInModal title="Create" />
        </form>
      </Modal>

      <LargeCreateButton
        title="Create Material"
        onClick={() => setOpened(true)}
      />
    </>
  );
};

export default CreateMaterialModal;
