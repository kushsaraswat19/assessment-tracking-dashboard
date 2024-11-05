// components/AddCandidateForm.js
import { useState } from 'react';
import axios from 'axios';

const AddCandidateForm = ({ onCandidateAdded }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/candidates', { name, status });
            onCandidateAdded(response.data);
            setName('');
            setStatus('Pending');
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Candidate Name" 
                required 
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Add Candidate</button>
        </form>
    );
};

export default AddCandidateForm;
