import React, {useState,useEffect} from 'react';
import axios from "axios";

const Privilige = () => {

    const [privileges, setPrivileges] = useState([])


    //  exemple d'api  de récuperer les privilèges, modifiez le avec l'url et votre logique coté backend
    const fetchPrivileges = async () =>{
        try{
            const response = await axios.get("http://localhost:8080/privileges");
            setPrivileges(response.data);
        }catch(err){
            console.error("erreur récupération privilèges : ", err)
        }

    }


    useEffect(() =>{
        fetchPrivileges(); // appel api au chargement du component
    }, [])


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Gestion des Privilèges</h2>
            {privileges.length > 0 ?(
                    <div className="bg-white shadow-md rounded-md p-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Privilege Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            { privileges.map((privilege)=>(

                                <tr key={privilege.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{privilege.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{privilege.description}</td>
                                    <td  className="px-6 py-4 whitespace-nowrap" >
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"  >Supprimer</button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button>
                                    </td>
                                </tr>

                            ))
                            }
                            </tbody>

                        </table>
                    </div>)
                : ( <p> Chargement des privilèges... </p>)
            }


            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Ajouter un Privilège
            </button>

        </div>
    );
};

export default Privilige;