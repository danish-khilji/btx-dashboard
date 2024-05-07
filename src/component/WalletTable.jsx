import { useEffect, useState } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';



function EditFormDialog({ initialData, updateTableData }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        bitcoin: '',
        solana: '',
        evm: '',
        doge: ''
    });

    const handleOpen = () => {
        setOpen(true);
        console.log(initialData)
        setFormData({ id: initialData._id, bitcoin: initialData.bitcoin, solana: initialData.solana, evm: initialData.evm, doge: initialData.doge });
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

        fetch('https://blockchain.eastasia.cloudapp.azure.com/update-wallet-address', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formData.id,

                bitcoin: formData.bitcoin,
                solana: formData.solana,
                evm: formData.evm,
                doge: formData.doge
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
                        <TextField
                            label="BITCOIN"
                            name="bitcoin"
                            value={formData.bitcoin}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: '8px 0' }}
                        />
                        <TextField
                            label="SOLANA"
                            name="solana"
                            value={formData.solana}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: '8px 0' }}
                        />
                        <TextField
                            label="EVM"
                            name="evm"
                            value={formData.evm}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: '8px 0' }}
                        />
                        <TextField
                            label="DOGE"
                            name="doge"
                            value={formData.doge}
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
                return {
                    ...row, bitcoin: updatedRowData.bitcoin,
                    solana: updatedRowData.solana,
                    evm: updatedRowData.evm,
                    doge: updatedRowData.doge,
                };
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
                    <thead className="bg-gray-900">
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
                                        <p> {row.bitcoin} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {row.solana} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {row.evm} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {row.doge} </p>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div>
                                        <EditFormDialog
                                            initialData={{ ...row }}
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

