import { Modal, Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import LargeCreateButton from "../shared/LargeCreateButton";
import CreateButtonInModal from "../shared/CreateButtonInModal";

const CreateSupplierModal = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty("Supplier name cannot be empty."),
    },
  });

  function handleClose() {
    setOpened(false);
    form.reset();
  }

  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={handleClose}
        title="Create Supplier"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            size="md"
            label="Supplier Name"
            placeholder="Supplier Name"
            {...form.getInputProps("name")}
          />
          <CreateButtonInModal />
        </form>
      </Modal>

      <LargeCreateButton
        title="Create Supplier"
        onClick={() => setOpened(true)}
      />
    </>
  );
};

export default CreateSupplierModal;
