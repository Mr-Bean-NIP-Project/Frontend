import { Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import CreateButtonInModal from "../shared/CreateButtonInModal";
import LargeCreateButton from "../shared/LargeCreateButton";

const CreateSupplierModal = () => {
  const [opened, setOpened] = useState(false);
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: async (newSupplier: Supplier) => {
      return (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier`,
          newSupplier
        )
      ).data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      notifications.show({
        title: "Create Successful",
        color: "green",
        icon: <IconCheck />,
        message: `New supplier ${data.name} of id: ${data.id} created!`,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error Creating Supplier",
        color: "red",
        icon: <IconX />,
        message: error.response.data.message,
      });
    },
  });

  function handleSubmit(values: any) {
    console.log(values);
    const newSupplier: Supplier = {
      name: values.name,
    };
    mutation.mutate(newSupplier);
    handleClose();
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
