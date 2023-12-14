import { useState } from "react";
import { useTheme } from "@mui/material";
import { useGetTitlesQuery } from "./state/api";
import Header from "./components/Header.jsx";
import DataGridCustomToolbar from "./components/DataGridCustomToolbar";

const Titles = () => {
const theme = useTheme();

// values to be sent to the backend
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(20);
const [sort, setSort] = useState({});
const [search, setSearch] = useState("");

const [searchInput, setSearchInput] = useState("");
const { data, isLoading } = useGetTitlesQuery({
   page,
   pageSize,
   sort: JSON.stringify(sort),
   search,
});

const columns = [
   {
     field: "intensity",
     headerName: "Intensity",
     flex: 1,
   },
   {
     field: "likelihood",
     headerName: "Likelihood",
     flex: 1,
   },
   {
     field: "end-year",
     headerName: "End-Yearr",
     flex: 1,
   },
   {
     field: "topics",
     headerName: "# of Topics",
     flex: 0.5,
     sortable: false,
     renderCell: (params) => params.value.length,
   },
   {
     field: "published",
     headerName: "Published",
     flex: 1,
     renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
   },
];

return (
   <Box m="1.5rem 2.5rem">
     <Header title="Titles" subtitle="Entire list of Titles" />
     <Box
       height="80vh"
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
         rows={(data && data.transactions) || []}
         columns={columns}
         rowCount={(data && data.total) || 0}
         rowsPerPageOptions={[20, 50, 100]}
         pagination
         page={page}
         pageSize={pageSize}
         paginationMode="server"
         sortingMode="server"
         onPageChange={(newPage) => setPage(newPage)}
         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
         onSortModelChange={(newSortModel) => setSort(...newSortModel)}
         components={{ Toolbar: DataGridCustomToolbar }}
         componentsProps={{
           toolbar: { searchInput, setSearchInput, setSearch },
         }}
       />
     </Box>
   </Box>
);
};

export default Titles;