import { useEffect, useState } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';



function EditFormDialog({ initialData, updateTableData }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ type: '', value: '' });

    const handleOpen = () => {
        setOpen(true);
        setFormData({ id: initialData.id, type: initialData.type, value: initialData.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://web3devsolutions.com:8443/update-gas-fee', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formData.id,
                type: formData.type,
                value: formData.value
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.success) {
                    updateTableData(responseData.data)
                } else {
                    console.error('Failed to update the channel', responseData.message);
                }
            })
            .catch(error => {
                console.error("Error updating channel:", error);
            });

        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog-title">
                <DialogTitle id="edit-dialog-title">Edit Form</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ margin: '8px 0' }}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type-select"
                                name="type"
                                value={formData.type}
                                label="Type"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="flat">Flat</MenuItem>
                                <MenuItem value="percentage">Percentage</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Value"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: '8px 0' }}
                        />
                        <Button type="submit" fullWidth variant="contained">Save</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



function GasFeeTable({ headers, rows }) {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(rows);
    }, [rows]);

    const updateTableRow = (updatedRowData) => {
        const newData = tableData.map(row => {
            if (row._id === updatedRowData._id) {
                return { ...row, type: updatedRowData.type, value: updatedRowData.value };
            }
            return row;
        });
        console.log("updatedRowData", updatedRowData)
        console.log("newData", newData)
        setTableData(newData);
    };


    return (
        <div style={{ paddingInline: 'inherit' }} className='overflow-x-auto w-full'>

            <div>

                <table className='mt-5 px-16 w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                    <thead className="bg-[#1976D2]">
                        <tr className="text-white text-left">
                            {headers?.map(header => (
                                <th key={header} className="font-semibold text-sm uppercase px-6 py-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tableData?.map((row, index) => (
                            <tr key={index}>


                                <td className="px-6 py-4">
                                    <div>
                                        <p>{row.type}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {row.value} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <EditFormDialog
                                            initialData={{ id: row._id, value: row.value, type: row.type }}
                                            updateTableData={updateTableRow}

                                        />
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default GasFeeTable;

