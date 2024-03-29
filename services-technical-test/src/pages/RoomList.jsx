import { useState, useEffect } from "react";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
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

  const handleReservation = (roomId) => {
    // Logique de réservation ici
    console.log(`Reserved room with ID ${roomId}`);
  };

  return (
    <div className="row" style={{width:"90vw"}}>
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
