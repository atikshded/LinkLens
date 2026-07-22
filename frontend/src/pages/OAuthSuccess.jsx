import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } else {
            navigate("/login");
        }

    }, [navigate, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060816] text-white">
            Signing you in...
        </div>
    );
}

export default OAuthSuccess;