export const dataGridStyle = {
  border: 1,
  borderColor: "#17a2b8",
  borderTopLeftRadius: "0px !important",
  borderTopRightRadius: "0px !important",
  "& .MuiDataGrid-main": {
    overflow: "auto !important",
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .9)" },
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-columnHeaders": {
    // backgroundColor: "#17a2b8",
    backgroundColor: "#4f5252",
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: 0,
    fontWeight: "500",
  },
  "&  .MuiSvgIcon-root": { width: ".7em" },
  "&  .MuiDataGrid-withBorderColor": {
    borderRight: "1px solid #80808063",
  },
  "& .MuiTablePagination-selectLabel ": {
    margin: "auto",
  },
  "& .MuiTablePagination-displayedRows": {
    margin: "auto",
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none !important",
  },
  "--DataGrid-overlayHeight": "300px",
};
