import React, { useEffect, useState } from "react";
import Table from "../component/NotificationTable";


const Notification = () => {
    const [formData, setFormData] = useState({ name: '', message: '', image: null });
    const [rows, setRows] = useState([]);

    const headers = ["Name", "message", "Image", "date & time", "delete"];

    useEffect(() => {
        fetch('https://web3devsolutions.com:8443/get_notifications')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRows(data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleUpdateRow = (newRow) => {
        setRows(currentRows => [newRow, ...currentRows]);
    }

    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter(row => row._id !== id);
        console.log(updatedRows)
        setRows(updatedRows);
    }

    return (
        <>
            <Table rows={rows} headers={headers} handleUpdateRow={handleUpdateRow} handleDeleteRow={handleDeleteRow} />
        </>
    );
};

export default React.memo(Notification);

