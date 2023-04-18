import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface LargeCreateButtonProps {
  title: string;
  onClick(): void;
}

const LargeCreateButton = ({ title, onClick }: LargeCreateButtonProps) => {
  return (
    <Button size="lg" leftIcon={<IconPlus />} radius="xl" onClick={onClick}>
      {title}
    </Button>
  );
};

export default LargeCreateButton;
