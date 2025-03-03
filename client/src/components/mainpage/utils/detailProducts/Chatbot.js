import axios from 'axios';
import React, { useState } from 'react';

const Chatbot = ({ movieDetails: { movie, year } }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    const handleInput = async () => {
        if (!message.trim()) return;
        setLoading(true);
        try {
            const response = await axios.post('https://cinemate-g8ix.onrender.com/api/chatbot', { message, movie, year });
            const AiResponse = response.data.aiResponse;
            setResponses([...responses, { user: message, ai: AiResponse }]);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            {/* Input & Button Wrapper */}
            <div className="chat-input-box">
                <input
                    type="text"
                    placeholder="Ask anything about the movie..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button onClick={handleInput} className="chat-button">Ask</button>
            </div>

            {/* Chat Responses */}
            <div className="chat-messages">
                {responses.map((res, i) => (
                    <div key={i} className="chat-message">
                        <p className="chat-user"><strong>You:</strong> {res.user}</p>
                        <p className="chat-bot"><strong>ChatBot:</strong> {res.ai}</p>
                    </div>
                ))}
                {loading && <p className="chat-loading">...Waiting for response</p>}
            </div>
        </div>
    );
};

export default Chatbot;
