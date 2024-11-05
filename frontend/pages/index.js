    // pages/index.js
    import CandidatesList from '../components/CandidatesList';
    import AddCandidateForm from '../components/AddCandidateForm';
    import { useState } from 'react';

    const Home = () => {
        const [candidates, setCandidates] = useState([]);

        const handleCandidateAdded = (newCandidate) => {
            setCandidates([...candidates, newCandidate]);
        };

        return (
            <div>
                <h1>Assessment Tracking Dashboard</h1>
                <AddCandidateForm onCandidateAdded={handleCandidateAdded} />
                <CandidatesList candidates={candidates} />
            </div>
        );
    };

    export default Home;
