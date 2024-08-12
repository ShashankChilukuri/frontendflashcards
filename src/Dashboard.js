import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashborad.css'; 

const Dashboard = ({ onLogout }) => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/flashcards/getall');
                setFlashcards(response.data);
            } catch (err) {
                console.error('Error fetching flashcards:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, []);

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:3001/api/flashcards/add', { question, answer, category });
            setQuestion('');
            setAnswer('');
            setCategory('');
            await fetchFlashcards(); // Refresh the list
        } catch (err) {
            console.error('Error adding flashcard:', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/api/flashcards/${editId}`, { question, answer, category });
            setQuestion('');
            setAnswer('');
            setCategory('');
            setEditId(null);
            await fetchFlashcards(); // Refresh the list
        } catch (err) {
            console.error('Error updating flashcard:', err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this flashcard?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/flashcards/${id}`);
                await fetchFlashcards(); // Refresh the list
            } catch (err) {
                console.error('Error deleting flashcard:', err);
            }
        }
    };

    const fetchFlashcards = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/flashcards/getall');
            setFlashcards(response.data);
        } catch (err) {
            console.error('Error fetching flashcards:', err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            <div className="form-container">
                <h2>{editId ? 'Update Flashcard' : 'Add Flashcard'}</h2>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question"
                />
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Answer"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <button onClick={editId ? handleUpdate : handleAdd}>
                    {editId ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </div>
            <div className="flashcards-list">
                {flashcards.map((flashcard) => (
                    <div key={flashcard.id} className="flashcard-item">
                        <div className="flashcard-content">
                            <p><strong>Question:</strong> {flashcard.question}</p>
                            <p><strong>Answer:</strong> {flashcard.answer}</p>
                            <p><strong>Category:</strong> {flashcard.category}</p>
                        </div>
                        <div className="flashcard-buttons">
                            <button className="edit" onClick={() => {
                                setEditId(flashcard.id);
                                setQuestion(flashcard.question);
                                setAnswer(flashcard.answer);
                                setCategory(flashcard.category);
                            }}>Edit</button>
                            <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
