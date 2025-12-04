// src/pages/Login.tsx
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [device, setDevice] = useState("hp");

  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const body = { username, password, device };

    try {
      const res = await api.post("/login", body);

      // backend balikin role = "admin" atau "dkm"
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "dkm") navigate("/dkm");
      else alert("Role tidak dikenal");

    } catch (err: any) {
      alert(err.response?.data?.error || "Login gagal");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h2>Login</h2>

      <input 
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input 
        type="password" 
        placeholder="password" 
        onChange={(e) => setPassword(e.target.value)} 
      />

      {/* device bebas, tapi default 'hp' seperti model kamu */}
      <select value={device} onChange={(e) => setDevice(e.target.value)}>
        <option value="hp">HP</option>
        <option value="display">Display</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
}
