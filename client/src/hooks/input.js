import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => {
    // setValue(event.target.value);
    setValue(target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    reset,
    fields: {
      type,
      value,
      onChange,
    },
  };
};
