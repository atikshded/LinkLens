import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterCard from "../components/auth/RegisterCard";
import { register } from "../services/authService";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
  e.preventDefault();

  try {
    setLoading(true);

    await register(name, email, password);

    toast.success("Account created successfully!");

    navigate("/login");

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message || "Registration failed"
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#060816] px-6 py-4 flex justify-center md:items-center">
      <RegisterCard
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onConfirmPasswordChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        onSubmit={handleRegister}
        loading={loading}
      />
    </div>
  );
}

export default Register;