import React, { useEffect, useState } from "react";
import WalletTable from "../component/WalletTable";

const Wallet = () => {
    const [formData, setFormData] = useState({ name: '', message: '', image: null });
    const [rows, setRows] = useState([]);

    const headers = ["Bitcoin", "Solana", "EVM", "doge", "edit"];


    useEffect(() => {
        fetch('https://blockchain.eastasia.cloudapp.azure.com/wallet-address-list')
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
            <WalletTable rows={rows} headers={headers} />
        </>
    );
};

export default React.memo(Wallet);

