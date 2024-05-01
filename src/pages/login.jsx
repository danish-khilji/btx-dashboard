import React from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()
    React.useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if (user && token) {
            navigate("/")
        }

    },)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            fetch('https://blockchain.eastasia.cloudapp.azure.com/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData.success) {
                        localStorage.setItem("user", JSON.stringify(responseData.user))
                        localStorage.setItem("token", responseData.token)
                        navigate("/")
                    } else {
                        alert("Invalid email or password")
                        return undefined;
                    }
                })
                .catch(error => {
                    alert("Invalid email or password")
                    console.log("Error", error);
                });

        } catch (error) {
            console.error("Error editing profile:", error);
        }
    };

    return (
        <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500">
            <div className=" justify-center align-middle">
                <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
                    Sign In
                </h1>
                <form onSubmit={handleSubmit} className="w-auto lg:w-96 grid">
                    <label className="text-sm text-white ml-2">Email</label>
                    <input
                        name="email"
                        onChange={(e) => handleChange(e)}
                        className=" p-2 rounded-md m-2 outline-none"
                    />
                    <label className="text-sm text-white ml-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        className=" p-2 rounded-md m-2 outline-none"
                    />
                    <div className="text-left mb-4 ml-2 mt-5 ">
                        <button variant="default">Login</button>
                        {/* <p className="text-sm font-semibold float-right text-white mt-2">
                            Forget password? <a href="/reset">
                                Reset here
                            </a>
                        </p> */}
                    </div>
                    <p className="text-white text-sm"></p>
                </form>
            </div>
        </div>
    );
};

export default React.memo(Login);
