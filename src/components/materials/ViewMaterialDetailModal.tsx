import { Modal, Table, Text } from "@mantine/core";
import { Material, Nutrition } from "@/types/types";
import { ModalStateEnum } from "../../types/constants";
import { MaterialNutritionInformationPanel } from "./MaterialNutritionInformationPanel";

interface ViewMaterialDetailModalProps {
  material: Material | undefined;
  modalState: ModalStateEnum;
  onClose(): void;
}

const ViewMaterialDetailModal = ({
  material,
  modalState,
  onClose,
}: ViewMaterialDetailModalProps) => {
  if (!material) return null;

  const { name, supplier, id, created_at, updated_at, supplier_id, ...data } =
    material;

  return (
    <>
      <Modal
        size="lg"
        opened={modalState === ModalStateEnum.View}
        onClose={() => onClose()}
        title={`#${material.id}: ${material.name}`}
      >
        {MaterialNutritionInformationPanel(data)}
      </Modal>
    </>
  );
};

export default ViewMaterialDetailModal;
