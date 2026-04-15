import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button>Register</button>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
}