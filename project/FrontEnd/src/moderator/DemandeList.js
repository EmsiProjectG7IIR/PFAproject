import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";

const DemandeTable = () => {
  const [demandes, setDemandes] = useState([]);

    useEffect(() => {
      const user = authService.getCurrentUser();

      //  if (user.roles.includes("ROLE_MODERATOR"))
          console.log("")
        axios
          .get("http://localhost:8092/moderator/viewRequests", {
            headers: authHeader(),
          })
          .then((response) => {
            setDemandes(response.data);
            console.log(demandes);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des demandes", error);
          });
    }, []);



  const handleAction = (demandeId, action) => {
    // Vous pouvez ici faire un appel API pour accepter ou rejeter la demande
    console.log(`Demande ${demandeId} ${action}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Utilisateur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demandes}
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.id}</td>
              <td>{demande.description}</td>
              <td>{demande.type}</td>
              <td>{demande.date}</td>
              <td>{demande.status}</td>
              <td>{demande.user.username}</td>
              <td>
                <button onClick={() => handleAction(demande.id, "accept")}>
                  Accepter
                </button>
                <button onClick={() => handleAction(demande.id, "reject")}>
                  Rejeter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandeTable;
