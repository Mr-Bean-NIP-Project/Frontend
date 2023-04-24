import { Button } from "@mantine/core";
import React from "react";

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
