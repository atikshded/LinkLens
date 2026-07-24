import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProfile } from "../services/userService";

function OAuthSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        async function loginWithGoogle() {

            const token = searchParams.get("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // Save JWT first
            localStorage.setItem("token", token);

            try {

                // Fetch logged-in user's profile
                const profile = await getProfile();

                // Save user details for Sidebar, Navbar, etc.
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: profile.name,
                        email: profile.email,
                    })
                );

                navigate("/dashboard");

            } catch (err) {

                console.error(err);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            }
        }

        loginWithGoogle();

    }, [navigate, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060816] text-white">
            Signing you in...
        </div>
    );
}

export default OAuthSuccess;