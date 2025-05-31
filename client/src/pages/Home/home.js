import React, { useState } from "react";
import "./home.css";
import axios from "axios";

function App() {
    const [ticker, setTicker] = useState("");
    const handleSubmit = () => {
        // Give the users name to the backend
        axios
            .post("http://127.0.0.1:5000/api/hello", { ticker })
            // Set the response onto the message
            .then((response) => {
                let backendAnswer = response.data.tickerName;
                console.log(backendAnswer);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <>
            <header className="app-header">
                <div className="logo-area">
                </div>
            </header>

            <main className="content-area">
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevents page reload
                        handleSubmit();
                    }}
                    className="search-form" // Added a class for the form
                >
                    <div id="titleMessage">
                        <h1 id="quantifyHeading">Quantify</h1>
                        <h2 id="headingDescription">All about the Stock Market</h2>
                    </div>
                    <h2 id="message">Enter Ticker</h2>
                    <div id="inputDiv"> {/* You can keep this div or style the input directly */}
                        <input
                            type="text"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)} /* Corrected: e.target.value */
                            placeholder="AAPL, GOOG, ..."
                            className="search-input" // Added a class for styling the input
                        />
                    </div>

                </form>
            </main>
        </>
    );
}

export default App;
