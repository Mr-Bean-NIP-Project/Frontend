import {
  Button,
  Grid,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { formatNutriText } from "../../../util";

const CreateMaterialModal = () => {
  const [opened, setOpened] = useState(false);

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
      supplier: "",
      ...nutriValues,
    },

    validate: {},
  });

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
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            size="md"
            data={[]}
            label="Supplier"
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
        onClose={() => setOpened(false)}
        title="Create Material"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {createMaterialFields}
          <Button fullWidth size="md" sx={{ marginTop: 20 }}>
            Create
          </Button>
        </form>
      </Modal>

      <Button size="lg" leftIcon={<IconPlus />} onClick={() => setOpened(true)}>
        Create Material
      </Button>
    </>
  );
};

export default CreateMaterialModal;
