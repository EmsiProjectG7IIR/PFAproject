import React, { useState } from "react";
import axios from "axios";

const DemandeItem = ({ demande }) => {
    const [newStatus, setNewStatus] = useState("");

    const handleChangeStatus = async () => {
        try {
            // Make a request to update the status
            await axios.put(`http://localhost:8092/api/demande/updateStatus/${demande.id}`, {
                newStatus: newStatus,
            });
            // Assuming you have a function to refresh the demandes after updating
            // For example, you can call loadDemandes() to refresh the demandes list.
            // loadDemandes();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3>Demande {demande.id}</h3>
            <p>Description: {demande.description}</p>
            <p>Type: {demande.type}</p>
            <p>Date: {demande.date}</p>
            <p>Status: {demande.status}</p>

            <div>
                <label htmlFor="newStatus">New Status:</label>
                <input
                    type="text"
                    id="newStatus"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                />
                <button onClick={handleChangeStatus}>Change Status</button>
            </div>
        </div>
    );
};

export default DemandeItem;
