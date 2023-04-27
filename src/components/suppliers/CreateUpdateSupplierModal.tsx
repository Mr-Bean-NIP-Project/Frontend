import { Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalStateEnum, QUERY_KEYS } from "@/types/constants";
import { Supplier } from "@/types/types";
import { useSupplierCreate, useSupplierUpdate } from "../../hooks/supplier";
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
    if (supplierToUpdate) {
      form.setFieldValue("name", supplierToUpdate.name ?? "");
    }
  };

  function handleClose() {
    onClose();
    form.reset();
  }

  useEffect(() => prepopulateFormFields(), [supplierToUpdate]);

  const createMutation = useSupplierCreate(queryClient);

  const updateMutation = useSupplierUpdate(queryClient);

  async function handleSubmit(values: any) {
    if (modalState === ModalStateEnum.Create) {
      const newSupplier: Supplier = {
        name: values.name,
      };
      try {
        const data = await createMutation.mutateAsync(newSupplier);
        notifications.show({
          title: "Create Successful",
          color: "green",
          icon: <IconCheck />,
          message: `New supplier ${data.name} of id: ${data.id} created!`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Creating Supplier",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    } else if (modalState === ModalStateEnum.Update) {
      const newSupplier: Supplier = {
        id: supplierToUpdate?.id,
        name: values.name,
      };
      try {
        const data = await updateMutation.mutateAsync(newSupplier);
        notifications.show({
          title: "Update Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Supplier ${data.name} of id: ${data.id} updated!`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Updating Supplier",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
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
