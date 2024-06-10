"use client"; 

import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";


interface PredictionCardProps {
    prediction: string | null;
    confidence: string | null;
    wasCorrect: boolean | null;
    correct: string;
    setWasCorrect: (value: boolean) => void;
    setCorrect: (value: string) => void;
    setShowPredictionCard: (value: boolean) => void;
}

const PredictionCard: React.FC<PredictionCardProps> = ({prediction, confidence, wasCorrect, correct, setWasCorrect, setCorrect, setShowPredictionCard}) => {
    const [error, setError] = useState<string | null>(null);
    const [showResponse, setShowResponse] = useState<boolean>(false);
    const handleSubmit = () => {
        /*if (wasCorrect === null) {
            setError("Please select if the prediction was correct.");
            return;
        }

        if (wasCorrect === false && correct==="") {
            setError("Please specify the correct digit.");
            return;
        }*/

        // Clear any previous error
        setError(null);
        setShowPredictionCard(false);
    };
    const handleWasCorrect = (e) => {
        setError(null);
        setWasCorrect(e.target.value === 'yes');
    }

    const handleSelectCorrect = (e) => {
        setError(null); 
        setCorrect(e.target.value);
    }

    return(
        <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Prediction Results</h2>
            {prediction && <p className="text-lg mb-4">Prediction: {prediction}</p>}
            {confidence && <p className="text-lb mb-4">Prediction Confidence: {confidence} percent</p>}

            <Button onClick={handleSubmit} className="ml-4 mt-4 mr-2 bg-gray-300 p-2 rounded hover:bg-gray-500">Try Again</Button>
            
            
            {showResponse && (
            <div className="mb-4">
                <label className="block text-lg mb-2">Were we correct?</label>
                <select
                    className="border rounded p-2"
                    value={wasCorrect ? 'yes' : wasCorrect === false ? 'no' : ''}
                    onChange={handleWasCorrect}
                    required
                >
                    <option value="" disabled>Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                {wasCorrect === false && (
                    <div className="mb-4">
                        <label className="block text-lg mb-2">What digit did you actually draw?</label>
                        <select
                            className="border rounded p-2"
                            value={correct || ''}
                            onChange={handleSelectCorrect}
                            required
                        >
                            <option value="" disabled>Select...</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="100">100</option>
                            <option value="1000">1000</option>
                            <option value="10000">10000</option>
                            <option value="100000000">100000000</option>
                        </select>
                    </div>)}
                {error && <p className="text-red-500">{error}</p>}
                <Button onClick={handleSubmit} className="ml-4 mt-4 mr-2 bg-gray-300 p-2 rounded hover:bg-gray-500">Submit</Button>
            </div>)}
        </div>
    );
}

export default PredictionCard;