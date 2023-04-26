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

  const createMutation = useSupplierCreate(queryClient);

  const updateMutation = useSupplierUpdate(queryClient);

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
