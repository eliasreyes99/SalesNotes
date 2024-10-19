import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Alerts from "../components/Alerts";

export default function Login() {
  const [alert, setAlert] = useState({ description: "", status: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [company_name, setCompanyName] = useState("");
  const navigate = useNavigate();

  const flipCard = () => {
    setIsLogin(!isLogin);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({ description: "Login successful", status: "alert-success" });
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(data));
          navigate("/home");
        }, 500);
      } else {
        setAlert({
          description: "User does not exist or password is incorrect",
          status: "alert-error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, company_name }),
      });
      if (response.ok) {
        setAlert({
          description: "Register successful",
          status: "alert-success",
        });
        setName('');
        setCompanyName('');
        setPassword('');
      } else {
        setAlert({
          description: "Username is already in use",
          status: "alert-error",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const resetAlert = () => {
    setAlert({ description: "", status: "" });
  };

  return (
    <div>
      {alert.description && (
        <Alerts
          description={alert.description}
          status={alert.status}
          resetAlert={resetAlert}
        />
      )}

      <div className="card">
        <div className={isLogin ? "card-inner" : "card-inner flipped"}>
          <div className="card-front">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleLogin}>
              <input
              required
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
              />
              <input
              required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(capitalizeFirstLetter(e.target.value))}
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <a onClick={flipCard}>Register</a>
            </p>
          </div>
          <div className="card-back">
            <h2>Register</h2>
            <form id="registerForm" onSubmit={handleRegister}>
              <input
              required
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
              />
              <input
              required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(capitalizeFirstLetter(e.target.value))}
              />
              <input
              required
                type="text"
                placeholder="Company Name"
                value={company_name}
                onChange={(e) => setCompanyName(capitalizeFirstLetter(e.target.value))}
              />
              <button type="submit" >
                Register
              </button>
            </form>
            <p>
              Already have an account? <a onClick={flipCard}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
