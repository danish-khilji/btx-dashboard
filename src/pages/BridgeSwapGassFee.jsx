import React, { useEffect, useState } from "react";
import GasFeeTable from "../component/gasFeeTable";

const BridgeAndSwapGasFee = () => {
    const [formData, setFormData] = useState({ name: '', message: '', image: null });
    const [rows, setRows] = useState([]);

    const headers = ["type", "value", "edit"];


    useEffect(() => {
        fetch('https://web3devsolutions.com:8443/gas-fee')
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
            <GasFeeTable rows={rows} headers={headers} />
        </>
    );
};

export default React.memo(BridgeAndSwapGasFee);

