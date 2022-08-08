import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const body = {
      username,
      password,
    };

    axios
      .post("http://94.74.86.174:8080/api/login", body)
      .then((data) => {
        localStorage.setItem("token", data.data.data.token);
        navigate("/");

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto px-5 m-24 flex justify-center">
      <div className="border border-slate-400 rounded-xl p-5 w-[32rem]">
        <h2 className="text-center mb-5 text-slate-600 font-bold">Login</h2>

        <label className="block mb-4">
          <span className="block font-medium text-slate-700">Username</span>
          <input
            type="text"
            placeholder="Username"
            className="form-data"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="block font-medium text-slate-700">Password</span>
          <input
            type="password"
            placeholder="Password"
            className="form-data"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn-primary w-full" onClick={() => handleSubmit()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
