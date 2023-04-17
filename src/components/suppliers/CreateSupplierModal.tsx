import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

const CreateSupplierModal = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      supplierName: "",
    },

    validate: {},
  });

  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Supplier"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput size="md" label="Supplier Name" {...form.getInputProps("supplierName")}/>
          <Button fullWidth size="md" sx={{ marginTop: 20 }}>
            Create
          </Button>
        </form>
      </Modal>

      <Button size="lg" leftIcon={<IconPlus />} onClick={() => setOpened(true)}>
        Create Supplier
      </Button>
    </>
  );
};

export default CreateSupplierModal;
