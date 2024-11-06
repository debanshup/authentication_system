import React, { useState } from "react";

const useInputFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  return { isFocused, handleFocus };
};

export default useInputFocus;
