import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetSectorsQuery } from "./state/api";
import Header from "./components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Sectors = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetSectorsQuery();
  console.log("data", data);

  const columns = [
    {
      field: "intensity",
      headerName: "Intensity",
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 0.5,
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
    },
    {
      field: "insights",
      headerName: "Insights",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "start-year",
      headerName: "Start-Year",
      flex: 1,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Sectors" subtitle="List of Sectors" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Sectors;