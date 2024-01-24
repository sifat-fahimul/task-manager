import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

interface ICustomDateProps {
  label: string;
  required?: boolean;
  value?: string | null;
  setValue(value: string): void;
}
const CustomDate: React.FC<ICustomDateProps> = ({
  label,
  value,
  required,
  setValue,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(newValue) => {
          setValue(dayjs(newValue).format("MM-DD-YYYY"));
        }}
        value={value}
        label={label}
        renderInput={(props) => {
          return (
            <TextField
              required={required}
              {...props}
              sx={{
                width: "100%",
                " & .MuiInputBase-root": {
                  fontSize: "15px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "9px !important",
                },
                "& .MuiInputLabel-root": {
                  top: "-7px !important",
                },
                "& .MuiInputLabel-shrink": {
                  top: "0px !important",
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDate;
