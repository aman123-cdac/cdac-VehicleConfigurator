import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token && token.startsWith("ey")) {
      localStorage.setItem("token", token);
      navigate("/welcome");
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
}
