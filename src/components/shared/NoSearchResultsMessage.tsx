import React from "react";
import DimmedMessage from "./DimmedMessage";

const NoSearchResultsMessage = () => {
  const title = "No search results";
  const subtitle = "Try searching something different";

  return <DimmedMessage title={title} subtitle={subtitle} />;
};

export default NoSearchResultsMessage;
