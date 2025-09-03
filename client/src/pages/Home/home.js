import React, { useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react"; 
import { Link } from "react-router-dom";
import "./home.css";


function App() {
    const [ticker, setTicker] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [sentiment, setsentiment] = useState("Bullish");
    const [news, setnews] = useState([
        { title: "Apple hits all-time high", url: "https://example.com/article1" },
        { title: "New product launch boosts Apple shares", url: "https://example.com/article2" },
    ]);
    const [hasSearched, setHasSearched] = useState(false);


    // Once submitted
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setHasSearched(true);

        // Simulate backend call
        axios
            .post("http://127.0.0.1:5000/api/hello", { ticker })
            .then((response) => {
                let backendAnswer = response.data.tickerName;
                console.log(backendAnswer);

                // After response, show the results
                setShowResults(true);
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
                        handleSubmit(e);
                    }}
                    className={hasSearched ? "search-form-top" : "search-form"}
                >
                    {!hasSearched && (
                        <div id="titleMessage">
                            <h1 id="quantifyHeading">Quantify</h1>
                            <h2 id="headingDescription">All about the Stock Market</h2>
                        </div>
                    )}


                    {!hasSearched && <h2 id="message">Enter Ticker</h2>}

                    <div id="inputDiv">
                        <input
                            type="text"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                            placeholder="AAPL, GOOG, ..."
                            className="search-input"
                        />
                    </div>

                </form>

                {showResults && (
                    <div className="results-container">
                        <div className="sentiment-section">
                            <h3>Current Analysis</h3>
                            <p>{sentiment}</p>
                        </div>

                        <div className="news-section">
                            <h3>Related News</h3>
                            <ul>
                                {news.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

            </main>
        </>
    );
}

export default App;
