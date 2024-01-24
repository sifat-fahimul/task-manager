"use client";
import { LoadingButton } from "@mui/lab";
import React, { ReactNode } from "react";
interface ICustomButtonProps {
  handleClick?: () => void;
  loading?: boolean;
  title?: string;
  icon: ReactNode;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  type: "button" | "submit" | "reset" | undefined;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  handleClick,
  loading,
  title,
  type,
  icon,
  color,
}) => {
  return (
    <>
      <LoadingButton
        size="small"
        type={type}
        fullWidth
        onClick={handleClick}
        loading={loading}
        variant="outlined"
        endIcon={icon}
        loadingPosition="end"
        className="py-2"
        color={color}
      >
        <span>{title}</span>
      </LoadingButton>
    </>
  );
};

export default CustomButton;
