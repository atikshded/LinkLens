import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginCard from "../components/auth/LoginCard";
import { login } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(email, password);

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.name,
          email: response.email,
        })
      );

      toast.success("Welcome back!");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#060816] px-6 overflow-hidden">
      <LoginCard
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        loading={loading}
      />
    </div>
  );
}

export default Login;