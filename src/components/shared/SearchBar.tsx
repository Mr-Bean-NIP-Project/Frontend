import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const SearchBar = () => {
  return (
    <TextInput
      icon={<IconSearch />}
      placeholder="Search"
      sx={{ marginTop: 20, marginBottom: 20 }}
    />
  );
};

export default SearchBar;
