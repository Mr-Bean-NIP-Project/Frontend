import { Button } from "@mantine/core";
import React from "react";

const CreateButtonInModal = () => {
  return (
    <Button
      fullWidth
      size="md"
      radius="md"
      type="submit"
      sx={{ marginTop: 20 }}
    >
      Create
    </Button>
  );
};

export default CreateButtonInModal;
