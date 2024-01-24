import { TextField } from "@mui/material";
import React from "react";
interface ICustomTextFieldProps {
  label: string;
  setValue(value: string): void;
  value: string;
  required?: boolean;
}
const CustomTextInput: React.FC<ICustomTextFieldProps> = ({
  label,
  setValue,
  value,
  required,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      label={label}
      required={required}
    />
  );
};

export default CustomTextInput;
