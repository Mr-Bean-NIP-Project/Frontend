import { Button } from "@mantine/core";

interface SubmitButtonInModalProps {
  title: string;
}
const SubmitButtonInModal = ({ title }: SubmitButtonInModalProps) => {
  return (
    <Button
      fullWidth
      size="md"
      radius="md"
      type="submit"
      sx={{ marginTop: 20 }}
    >
      {title}
    </Button>
  );
};

export default SubmitButtonInModal;
