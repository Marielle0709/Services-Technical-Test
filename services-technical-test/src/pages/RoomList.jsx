import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate} from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")===null){
      history('/');

    }
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/salles");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleReservation = async (roomId) => {
    try {
      // Envoyer une requête pour effectuer la réservation de la salle avec l'ID roomId
      const response = await axios.post(`http://localhost:3000/reservations`, {
        salleId: roomId,
        date: new Date().toISOString(), // Exemple de date actuelle
        montant: rooms.find(room => room.id === roomId).prix // Prix de la salle
      });
      
      // Afficher un message de succès ou effectuer d'autres actions nécessaires
      console.log("Réservation effectuée avec succès:", response.data);
    } catch (error) {
      console.error("Error reserving room:", error);
    }
  };

  return (
    <div className="row" style={{ width: "100%", margin: "0", height: "90vh" }}>
      <Navbar />
      {rooms ? (
        rooms.map((room) => (
          <div key={room.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.nom}</h5>
                <p className="card-text">Numéro: {room.numero}</p>
                <p className="card-text">Prix: {room.prix} €</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleReservation(room.id)}
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2>Chargement...</h2>
      )}
    </div>
  );
};

export default RoomList;
