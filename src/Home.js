import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Flashcards.css';

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/flashcards/getall');
                setFlashcards(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlipped(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setFlipped(false);
    };

    const handleFlip = () => {
        setFlipped((prevFlipped) => !prevFlipped);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching flashcards: {error.message}</p>;

    if (flashcards.length === 0) return <p>No flashcards available</p>;

    const { question, answer } = flashcards[currentIndex];

    return (
        <div className="flashcards-container">
            <div className="flashcard-container" onClick={handleFlip}>
                <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
                    <div className="question">
                        <div className="content">{question}</div>
                    </div>
                    <div className="answer">
                        <div className="content">{answer}</div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
            <div className="admin-login">
                <button onClick={handleLogin}>Admin Login</button>
            </div>
        </div>
    );
};

export default Flashcards;
