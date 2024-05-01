import { useState, useEffect } from "react";
function Card() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://blockchain.eastasia.cloudapp.azure.com/gas-fee')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data)
                setData(data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div class="items-center px-4">
            <div class="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
                <div className="w-full p-2 lg:w-1/2 md:w-1/2 flex flex-col">
                    <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group flex-grow">

                        <div class="flex flex-row justify-between items-center">
                            <div class="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                    <path fill-rule="evenodd"
                                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                        </div>
                        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{data[0]?.value}</h1>
                        <div class="flex flex-row justify-between group-hover:text-gray-200">
                            <p>Bridge and swap percentage</p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>


                <div className="w-full p-2 lg:w-1/2 md:w-1/2 flex flex-col">
                    <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group flex-grow">
                        <div class="flex flex-row justify-between items-center">
                            <div class="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                0
                            </div>
                        </div>
                        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">0
                        </h1>
                        <div class="flex flex-row justify-between group-hover:text-gray-200">
                            <p>user</p>
                            {/* <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Card;
