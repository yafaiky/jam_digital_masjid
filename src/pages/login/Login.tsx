// src/pages/login/Login.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const device = e.target.device.value; // "hp" atau "tv"

    const res = await axios.post("http://localhost:8080/login", {
      username,
      password,
      device,
    });

    login(res.data.token, res.data.role);

    // 🚀 Redirect otomatis sesuai role
    navigate(`/${res.data.role}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 10 }}>
      <input name="username" placeholder="username" />
      <input name="password" placeholder="password" type="password" />

      {/* pilih login HP atau TV */}
      <select name="device">
        <option value="hp">HP (Admin DKM)</option>
        <option value="tv">TV (Display)</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
}
