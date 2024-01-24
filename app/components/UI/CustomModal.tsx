import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface BootstrapDialogTitleProps {
  children?: ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            color: "red",
          }}
        >
          <IoMdClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  setOpen,
  title,
  children,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        sx={{
          maxWidth: { xs: "100%", sm: "80%", md: "100%" },
          marginX: "auto",
          mb: -2,
        }}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ overflow: "hidden" }}>
          {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default CustomModal;
