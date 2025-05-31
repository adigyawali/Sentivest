import React, { useState } from "react";
import "./login.css";
import { Eye, EyeOff, LucideArrowUpRightFromSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState(""); // The username
    const [usernameGiven, setUsernameGiven] = useState(false); // To make sure login function only goes off if a username is given
    const [password, setPassword] = useState(""); // Password
    const [passwordGiven, setPasswordGiven] = useState(false); // To make sure login only goes off if a password is also given
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for if the user is logged in
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically


    // Log the user in
    const handleLogin = () => {
        if (usernameGiven === true && passwordGiven === true){
            console.log("BALALALALALALA");
            setIsLoggedIn(true);
        } else {
            console.log("Thi");
        }
        
    };

    // Actual Page
    return (
        <div className="loginContainer">
            {!isLoggedIn ? (
                <>
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
                </>
            ) : (
                <h2>Welcome, {username}. You're logged in!</h2>
            )}
        </div>
    );
}

export default Login;
