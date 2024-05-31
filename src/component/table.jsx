import { useEffect, useState } from 'react';

function Table() {

    const [data, setData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://web3devsolutions.com:8443/get_channel')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTableData(data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleToggle = (id, status) => {
        let newStatus = !status;
        fetch('https://web3devsolutions.com:8443/update_channel', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                status: newStatus
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
                    const newTableData = tableData.map(item => {
                        if (item._id === id) {
                            return { ...item, status: newStatus };
                        }
                        return item;
                    });

                    setTableData(newTableData);
                } else {
                    console.error('Failed to update the channel', responseData.message);
                }
            })
            .catch(error => {
                console.error("Error updating channel:", error);
            });
    };


    const headers = ["Name", "Status"];

    return (
        <div style={{ paddingInline: 'inherit' }} className='overflow-x-auto w-full'>
            <table className=' px-16 w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-[#1976D2]">
                    <tr className="text-white text-left">
                        {headers.map(header => (
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
                                <div className="flex items-center space-x-3">
                                    <div className="inline-flex w-10 h-10">
                                        <img className='w-10 h-10 object-cover rounded-full' alt='Channel avatar' src={row.imageUrl} />
                                    </div>
                                    <div>
                                        <p> {row.name} </p>
                                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {row.email} </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer" checked={row.status || false}
                                        onChange={() => handleToggle(row._id, row.status)}
                                    />
                                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                                </label>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

