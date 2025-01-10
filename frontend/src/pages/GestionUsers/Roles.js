import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Roles = () => {
    const [roles, setRoles] = useState([]);


    //  exemple appel API récuperer roles, vous devrez modifier cette api avec la votre.
    const fetchRoles = async () => {
        try{
            const response = await axios.get('http://localhost:8080/roles');
            setRoles(response.data)
        } catch (err){
            console.error("Erreur récupération de rôles:", err);
        }
    }


    useEffect(() => {
        fetchRoles() // appel api au chargement du composant
    }, [])

    // exemples d'affichage :

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Gestion des Rôles</h2>
            {roles.length > 0 ?(  <div className="bg-white p-4 shadow-md rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {roles.map((role) =>(  <li  key={role.id}  className="flex justify-between py-2">
                                <span className="font-semibold">{role.name}</span>
                                <div className="flex gap-4">
                                    <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Supprimer</button>
                                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            ) : (<p>chargement des rôles...</p>)}


            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Ajouter un role
            </button>
        </div>
    );
};

export default Roles;