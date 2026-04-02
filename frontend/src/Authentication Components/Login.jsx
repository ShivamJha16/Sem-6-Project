import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

const Login = ({ onSwitch }) => {
  const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all the fields");
            return
        }

        if (role === "admin" && !key) {
            alert("Please enter the admin key");
            return
        }

        setLoading(true);

        const UserData = {
            email,
            password,
            role,
            key,
        };

        try {
            const { data } = await axios.post("http://localhost:8000/api/user/login", UserData);  
            localStorage.setItem("user", JSON.stringify(data));
            if(data.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
            setLoading(false);
        } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.msg || error.message);
    setLoading(false);
}
    }

  return (
    <>
      <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

      <input type="email" placeholder="Email" className="input-style" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="input-style" onChange={e => setPassword(e.target.value)} />

      {/* Role Selection */}
      <select 
        className="input-style"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* Admin Key Input */}
      {role === "admin" && (
        <input type="text" placeholder="Admin Key" className="input-style" onChange={e => setKey(e.target.value)} />
      )}

      <button className="btn-primary" onClick={handleLogin}>Login</button>

      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <span className="text-yellow-500 cursor-pointer" onClick={onSwitch}>
          Register
        </span>
      </p>
    </div>
    {
      loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-950 bg-opacity-80 flex items-center justify-center z-50">
          <RingLoader
            color="yellow"
            size={70}
            loading={loading}
          />
        </div>
      )
    }
    </>
  );
};

export default Login;
