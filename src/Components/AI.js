import React, { useState } from "react";
import { getOpenAIResponse } from "../api";
import "./AI.css";

function AI() {
  const [prompt, setPrompt] = useState("Give me a brief overview of the current Formula 1 season.");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setError(null);

    const f1Data = JSON.parse(localStorage.getItem(`Standings_2024`));
    const prompt = `Here"s the current F1 data: ${f1Data}. Can you summarize the standings and key highlights from the season so far?`;
    setPrompt(prompt);

    try {
      const openAIResponse = await getOpenAIResponse(prompt);
      
      if (openAIResponse) {
        setResponse(openAIResponse);
      } else {
        setError("Error: OpenAI returned no response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data from OpenAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AI">
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          Learn
        </button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AI;