
import React, { useEffect, useState } from "react";
import WalletTable from "../component/WalletTable";


const Wallet = () => {
    const baseurl = import.meta.env.VITE_BASE_URL
    const port = import.meta.env.VITE_PORT

    const url = `${baseurl}:${port}/wallet-address-list`
    const [rows, setRows] = useState([]);

    const headers = ["Bitcoin", "Solana", "EVM", "doge", "edit"];


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
            <WalletTable rows={rows} headers={headers} />
        </>
    );
};

export default React.memo(Wallet);

