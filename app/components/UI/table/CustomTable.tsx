import React from "react";
import { DataGrid, GridToolbar, GridToolbarProps } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { dataGridStyle } from "./tableStyle";

interface CustomTableProps {
  rows?: any[];
  columns?: any[];
  loading?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  rows = [],
  columns = [],
  loading = false,
}) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.key}
        density="compact"
        sx={dataGridStyle}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          } as GridToolbarProps,
        }}
      />
    </>
  );
};

export default CustomTable;
