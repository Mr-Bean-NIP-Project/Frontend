import {
  Grid,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { formatNutriText } from "../../../util";
import LargeCreateButton from "../shared/LargeCreateButton";
import CreateButtonInModal from "../shared/CreateButtonInModal";

const CreateMaterialModal = () => {
  const [opened, setOpened] = useState(false);

  const suppliers: Supplier[] = [
    { id: 1, name: "Supplier ABC" },
    { id: 2, name: "Supplier XYZ" },
  ];

  const nutri: string[] = [
    "energy",
    "protein",
    "total_fat",
    "saturated_fat",
    "trans_fat",
    "cholesterol",
    "carbohydrate",
    "sugars",
    "dietary_fibre",
    "sodium",
  ];

  const nutriValues: ColumnArgument = {};
  nutri.forEach((val) => (nutriValues[val] = 0));

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
  nutri.forEach((val) => {
    const nutriText = formatNutriText(val);
    nutritionalFields.push(
      <tr key={val}>
        <td>{nutriText}</td>
        <td>
          <NumberInput
            key={val}
            placeholder={nutriText}
            size="sm"
            min={0}
            {...form.getInputProps(val)}
          />
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
          <CreateButtonInModal />
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
