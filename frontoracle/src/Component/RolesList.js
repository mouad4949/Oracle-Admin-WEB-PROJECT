import React  from 'react' ;
import {FiShield, FiTrash} from 'react-icons/fi';
export const RolesList = ({roles, loading, onGrant,onDelete}) => {
    if (loading) {
        return <div className="flex justify-center items-center h-48 bg-gray-200 rounded-lg">Chargement des rôles...</div>;
    }

    if (!roles.length) {
        return <div className="flex justify-center items-center h-48 bg-gray-200 rounded-lg">Aucun rôle trouvé.</div>;
    }
    return(
        <div>
            <h2 className="text-2xl font-bold mb-4 text-red-700">Gestion des Rôles</h2>
            {roles.length > 0 ? (<div className="bg-white p-4 shadow-md rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {roles.map((role) => (<li key={role.id} className="flex justify-between py-2">
                                <span className="font-semibold"> {role.roleName}</span>
                                <div className="flex gap-4">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onGrant(role.roleName)}
                                    ><FiShield/>
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onDelete(role.id)}
                                    ><FiTrash/>
                                    </button>


                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            ) : (<p>chargement des rôles...</p>)}


        </div>
    );
}
export default RolesList;
