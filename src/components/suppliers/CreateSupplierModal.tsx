import { Modal, Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconAlertCircleFilled,
  IconCheck,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import LargeCreateButton from "../shared/LargeCreateButton";
import CreateButtonInModal from "../shared/CreateButtonInModal";
import axios from "axios";
import { notifications } from "@mantine/notifications";

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

  function handleSubmit(values: any) {
    console.log(values);
    const newSupplier: Supplier = {
      name: values.name,
    };
    createSupplier(newSupplier);
    handleClose();
  }

  async function createSupplier(newSupplier: Supplier) {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/supplier`, newSupplier)
      .then((response) =>
        notifications.show({
          title: "Create Successful",
          color: "green",
          icon: <IconCheck />,
          message: `New supplier ${response.data.name} of id: ${response.data.id} created!`,
        })
      )
      .catch((error) => {
        if (error.response) {
          notifications.show({
            title: "Error Creating Supplier",
            color: "red",
            icon: <IconX />,
            message: error.response.data.message,
          });
        }
      });
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
