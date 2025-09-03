import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios"

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userNameGiven, setUsernameGiven] = useState(false);
    const [passwordGiven, setPasswordGiven] = useState(false);
    const [secondPasswordGiven, setSecondPasswordGiven] = useState(false);
    const [doPasswordMatch, setDoPasswordMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const navigate = useNavigate();

    // Sign the user up
    const handleSignup = () => {
        // Check all the conditons
        if (userNameGiven === true && passwordGiven === true && secondPasswordGiven === true && doPasswordMatch === true) {

            axios
                .post("http://127.0.0.1:5000/signup",
                    {
                        username,
                        password
                    })
                .then(
                    (response) => {
                            navigate("/login");

                    })

                .catch((error) => {
                    if (error.response) {
                        // Backend responded with a non-2xx status
                        if (error.response.status === 409) {
                            setErrorMessage("Username Already Exists");
                        } else {
                            setErrorMessage("Signup failed. Please try again.");
                        }
                    } else {
                        // No response at all (true network error)
                        setErrorMessage("Network error occurred");
                    }
                    setShowErrorMessage(true);
                });


        }
    };


    //Webpage
    return (
        <div className="signupContainer">
            <>
                <h1>Signup</h1>

                <div id="signupBubble">

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


                    {/*Input for the confirm password */}

                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setSecondPasswordGiven(true);
                                setConfirmPassword(e.target.value);
                                setDoPasswordMatch(e.target.value === password);
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

                    {/*Show the error if passwords do not match*/}
                    {secondPasswordGiven && !doPasswordMatch && (

                        <p id="passwordError">Error, Passwords do not Match</p>

                    )}

                    {/* Show error message*/}
                    {showErrorMessage && (
                        <p id="signupErrorMessage">{errorMessage}</p>
                    )}

                    <button className="signupButton" onClick={handleSignup}>Signup</button>

                </div>
            </>
        </div>
    );
}

export default Signup;