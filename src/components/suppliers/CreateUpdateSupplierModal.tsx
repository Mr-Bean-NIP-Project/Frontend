import { Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ModalStateEnum } from "@/types/constants";
import { Supplier } from "@/types/types";
import { useSupplierCreate, useSupplierUpdate } from "../../hooks/supplier";
import SubmitButtonInModal from "../shared/SubmitButtonInModal";

interface CreateUpdateSupplierModalProps {
  supplierToUpdate?: Supplier;
  modalState: ModalStateEnum;
  // use isModalOpen for opening and closing of this modal instead of modifying modal state
  isModalOpen: boolean;
  onClose(): void;
}

const CreateUpdateSupplierModal = ({
  supplierToUpdate,
  modalState,
  isModalOpen,
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
    if (supplierToUpdate && modalState === ModalStateEnum.Update) {
      form.setFieldValue("name", supplierToUpdate.name ?? "");
    }
  };

  function handleClose() {
    onClose();
    form.reset();
  }

  useEffect(() => prepopulateFormFields(), [supplierToUpdate, modalState]);

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
        handleClose();
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
        handleClose();
      } catch (error: any) {
        notifications.show({
          title: "Error Updating Supplier",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    }
  }

  return (
    <>
      <Modal
        size="lg"
        opened={isModalOpen}
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={handleClose}
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
