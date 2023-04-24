import { ActionIcon, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

interface SharedSearchBarProps {
  onSearch(searchStr: string): void;
}

const SharedSearchBar = ({ onSearch }: SharedSearchBarProps) => {
  const [currentSearchStr, setCurrentSearchStr] = useState("");

  const handleSearch = (searchStr: string) => {
    setCurrentSearchStr(searchStr);
    onSearch(searchStr);
  };

  const handleClear = () => {
    setCurrentSearchStr("");
    onSearch("");
  };

  return (
    <TextInput
      size="lg"
      placeholder="Search by ID or name"
      icon={<IconSearch size={"1.25rem"} />}
      sx={{ marginTop: 20, marginBottom: 20 }}
      value={currentSearchStr}
      onChange={(event) => handleSearch(event.currentTarget.value)}
      rightSection={
        <ActionIcon onClick={handleClear}>
          <IconX size={"1.25rem"} />
        </ActionIcon>
      }
    />
  );
};

export default SharedSearchBar;
