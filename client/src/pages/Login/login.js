import React, { useState } from "react";
import "./login.css";
import { Eye, EyeOff} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState(""); 
    const [usernameGiven, setUsernameGiven] = useState(false); 
    const [password, setPassword] = useState(""); 
    const [passwordGiven, setPasswordGiven] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    // Log the user in
    const handleLogin = () => {
        if (usernameGiven === true && passwordGiven === true){
            console.log("User logged in successfully");
            onLogin(username); // Call the parent function to update login state
            navigate("/"); // Redirect to home page after login
        } else {
            console.log("Please enter both username and password");
        }
    };

    // Actual Page
    return (
        <div className="loginContainer">
            <h1>Login</h1>

            <div id="loginBubble">
                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsernameGiven(true);
                        setUsername(e.target.value);
                    }}
                    className="userInfo"
                />

                {/*Original Password */}
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPasswordGiven(true);
                            setPassword(e.target.value);
                        }}
                        className="userInfo"
                    />
                    <button
                        type="button"
                        className="eye-button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button onClick={handleLogin}>Login</button>
                <button onClick={() => navigate("/signup")}>Create Account</button>

            </div>
        </div>
    );
}

export default Login;