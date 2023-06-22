import { MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import EditUser from "./ModalEdit"
import Axios from "axios"
import { Box, Button } from '@mui/material';
import { borderRadius, height } from '@mui/system';
import { ExportToCsv } from 'export-to-csv';

function UserTable() {
    
   
    function getAllUser() {
        Axios.get("http://localhost:4000/user/fetch")
            .then(res => {
                setAllUser(res.data.allUser)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const [editUser, getEditUser] = useState("")
    const [open, setOpen] = useState(false);
    const handleEdit = (user) => {
        setOpen(true)
        getEditUser(user)
    };
    const handleClose = () => setOpen(false);
    const [allUser, setAllUser] = useState([])
    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
        },

        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ renderedCellValue, row }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <Box
                        sx={{
                            width: "1rem",
                            height: "1rem",
                            borderRadius: "50%",
                            backgroundColor: renderedCellValue === "active" ? "green" : "red"
                        }}>

                    </Box>
                    <span>{renderedCellValue}</span>
                </Box>

            ),
        },
        {
            header: "Update User",
            Cell: ({ row }) => (
                <Box>
                    <Button
                        onClick={async () => {
                            await handleEdit(row)
                            await getAllUser()


                        }
                        }
                    >Edit User</Button>
                </Box>

            ),
        }
    ], [])
    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        // useKeysAsHeaders: false,
        // headers: columns.map((c) => c.header),
      };
      
    const csvExporter = new ExportToCsv(csvOptions);
    const handleExportData = () => {
        csvExporter.generateCsv(allUser)
    }
    useEffect(() => {

        getAllUser()
    }, [getAllUser])
    return <>
        <Box mb={5}>
            <Button
                color="primary"
                onClick={handleExportData}
                variant="contained"
            >
                Export All Data
            </Button>
        </Box>
        <MaterialReactTable
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            columns={columns} data={allUser}
            renderTopToolbarCustomActions={({ table }) => (
                <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                    color="primary"
                    onClick={handleExportData}
                    variant="contained"
                >
                    Export All Data
                </Button>
            )

            }
        />
        <EditUser
            open={open}
            handleClose={handleClose}
            editUser={editUser}
        />
    </>
}
export default UserTable