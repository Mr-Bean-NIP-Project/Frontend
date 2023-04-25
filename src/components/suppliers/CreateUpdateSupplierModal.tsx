import { Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalStateEnum } from "@/types/constants";
import { Supplier } from "@/types/types";
import LargeCreateButton from "../shared/LargeCreateButton";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";

interface CreateUpdateSupplierModalProps {
  supplierToUpdate?: Supplier;
  modalState: ModalStateEnum;
  onClose(): void;
}

const CreateUpdateSupplierModal = ({
  supplierToUpdate,
  modalState,
  onClose,
}: CreateUpdateSupplierModalProps) => {
  const queryClient = useQueryClient();

  const modalTitle =
    modalState === ModalStateEnum.Create
      ? "Create Supplier"
      : "Update Supplier";

  const submitButtonTitle =
    modalState === ModalStateEnum.Create ? "Create" : "Save";

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty("Supplier name cannot be empty."),
    },
  });

  const prepopulateFormFields = () => {
    console.log(supplierToUpdate);
    if (supplierToUpdate) {
      form.setFieldValue("name", supplierToUpdate.name ?? "");
    }
  };

  function handleClose() {
    onClose();
    form.reset();
  }

  useEffect(() => prepopulateFormFields(), [supplierToUpdate]);

  const createMutation = useMutation({
    mutationFn: async (newSupplier: Supplier) => {
      return (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier`,
          newSupplier
        )
      ).data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Supplier[]>(["supplier"], (old = []) => {
        return [...old, data]; // appends newly created supplier to list
      });
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

  const updateMutation = useMutation({
    mutationFn: async (newSupplier: Supplier) => {
      return (
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier/${newSupplier.id}`,
          { name: newSupplier.name }
        )
      ).data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Supplier[]>(["supplier"], (old = []) => {
        const oldDataIndex = old.findIndex((sup) => sup.id === data.id);
        if (oldDataIndex === -1) return old;

        old[oldDataIndex] = { ...data }; // replaces old supplier info with newly updated supplier.
        return old;
      });
      notifications.show({
        title: "Update Successful",
        color: "green",
        icon: <IconCheck />,
        message: `Supplier ${data.name} of id: ${data.id} updated!`,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error Updating Supplier",
        color: "red",
        icon: <IconX />,
        message: error.response.data.message,
      });
    },
  });

  function handleSubmit(values: any) {
    if (modalState === ModalStateEnum.Create) {
      const newSupplier: Supplier = {
        name: values.name,
      };
      createMutation.mutate(newSupplier);
    } else if (modalState === ModalStateEnum.Update) {
      const newSupplier: Supplier = {
        id: supplierToUpdate?.id,
        name: values.name,
      };
      updateMutation.mutate(newSupplier);
    }
    handleClose();
  }

  return (
    <>
      <Modal
        size="lg"
        opened={modalState !== ModalStateEnum.Hidden}
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={() => onClose()}
        title={modalTitle}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            size="md"
            label="Supplier Name"
            placeholder="Supplier Name"
            {...form.getInputProps("name")}
          />
          <SubmitButtonInModal title={submitButtonTitle} />
        </form>
      </Modal>
    </>
  );
};

export default CreateUpdateSupplierModal;
