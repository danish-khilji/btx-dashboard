import React, { useEffect, useState } from "react";
import SwapFeeTable from "../component/swapFeeTable";


const SwapFee = () => {
    // const [formData, setFormData] = useState({ name: '', message: '', image: null });
    const [rows, setRows] = useState([]);
    const baseurl = import.meta.env.VITE_BASE_URL
    const port = import.meta.env.VITE_PORT

    const url = `${baseurl}:${port}/swap-fee`

    const headers = ["type", "value", "edit"];


    useEffect(() => {
        fetch(url)
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


    return (
        <>
            <SwapFeeTable rows={rows} headers={headers} />
        </>
    );
};

export default React.memo(SwapFee);

