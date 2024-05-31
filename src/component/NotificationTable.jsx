import { useEffect, useState } from 'react';

import {
    Button, TextField, TextareaAutosize, Dialog, DialogActions,
    DialogContent, DialogTitle, useMediaQuery, useTheme
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';



function AddNotificationDialog(props) {
    const { onClose, selectedValue, open, handleUpdateTable } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [formData, setFormData] = useState({ name: '', message: '', image: null });
    const handleClose = () => {
        onClose(selectedValue);
    };


    const addNotification = async (formData) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('message', formData.message);
        if (formData.image) {
            data.append('image', formData.image);
        }
        try {
            fetch('https://web3devsolutions.com:8443/add_notification', {
                method: 'POST',
                body: data
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData.success) {
                        console.log(responseData)
                        alert(responseData.message);
                        handleUpdateTable(responseData.data)
                        handleClose()
                    } else {
                        return undefined;
                    }
                })
                .catch(error => {
                    console.log("Error", error);
                });

        } catch (error) {
            console.log("Error", error)

        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: files && files.length > 0 ? files[0] : value
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNotification(formData);
        } catch (error) {
            console.error("Error while submitting notification:", error);
        }
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Add New Notification"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="name"
                        required
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{
                            margin: '8px 0',
                            '.MuiOutlinedInput-root': {
                                '& > fieldset': {
                                    borderColor: 'grey',
                                },
                            },
                        }}
                    />
                    <>
                        <style>
                            {`
                textarea.textarea-autosize:focus {
                    outline: 2px solid #1976d2 !important;
                }`}
                        </style>
                        <TextareaAutosize
                            minRows={4}
                            name="message"
                            required
                            onChange={handleChange}
                            placeholder="Write your thoughts here..."
                            className="textarea-autosize"
                            style={{
                                width: '100%',
                                margin: '8px 0',
                                border: '1px solid grey',
                                padding: '8px',
                                borderRadius: '5px',
                                outline: 'none',
                            }}
                        />
                    </>


                    <label className="block mb-2">
                        <span className="sr-only">Choose Notification image</span>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="block w-full text-sm
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100"
                        />
                    </label>

                    <Button type="submit" fullWidth variant="contained"
                        onClick={handleSubmit}>
                        Add
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}


function Table({ headers, rows, handleUpdateRow, handleDeleteRow }) {

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const handleUpdateTable = (data) => {
        handleUpdateRow(data)
    };

    const handleDelete = (id) => {
        try {
            fetch(`https://web3devsolutions.com:8443/delete_notification?id=${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData.success) {
                        handleDeleteRow(id)
                    } else {
                        return undefined;
                    }
                })
                .catch(error => {
                    console.log("Error", error);
                });

        } catch (error) {
            console.log("Error", error)

        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours.toString().padStart(2, '0') : '12';
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    }


    return (
        <div style={{ paddingInline: 'inherit' }} className='overflow-x-auto w-full'>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    <AddIcon />
                    Add Notification
                </Button>
            </div>
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
                        {rows?.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <p> {row.name} </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {row.message} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <img className='w-10 h-10 object-cover rounded-full' alt='Channel avatar' src={row.imageUrl} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p> {formatDate(row.date)} </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(row._id)}>
                                        <DeleteIcon />
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AddNotificationDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                    handleUpdateTable={handleUpdateTable}
                />

            </div>
        </div>
    );
}

export default Table;

