import React from 'react';
import { FiUser, FiClock, FiEdit2, FiTrash2, FiShield } from 'react-icons/fi';

const UserList = ({ users, loading, onEdit, onGrantRole }) => {
    if (loading) {
        return <div className="flex justify-center items-center  h-48  bg-gray-200 rounded-lg ">
            Chargement des utilisateurs...
        </div>;
    }

    if (!users.length) {
        return <div className="flex justify-center items-center  h-48  bg-gray-200 rounded-lg ">Aucun utilisateur trouvé.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
                <div key={user.id}
             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="p-6 flex items-center justify-between">
                <div className="w-2/3 flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <FiUser className="mr-2 text-blue-500"/> {user.username}
                    </h3>

                    <p className="flex items-center text-gray-600 text-sm mt-2"><FiClock
                        className="mr-1 text-gray-400"/>
                        <time className="relative top-[1px]">{user.dateCreation}</time>
                    </p>
                </div>
                <div className=" flex flex-col w-[55px] gap-3 justify-center h-full  ">
                    <button title='modifier' onClick={() => onEdit(user)}
                            className=" flex w-10 h-10 p-[10px] hover:bg-blue-50  text-blue-500 hover:text-blue-700 rounded-full ">
                        <FiEdit2/></button>
                    <button title='supprimer'
                            className="flex  w-10 h-10 p-[10px] hover:bg-red-50   text-red-500 hover:text-red-700 rounded-full">
                        <FiTrash2/></button>
                    <button title='Ajouter un role' onClick={() => onGrantRole(user.id)}
                            className="flex  w-10 h-10 p-[10px] hover:bg-green-50   text-green-500 hover:text-green-700 rounded-full">
                        <FiShield/></button>
                </div>
            </div>
        </div>
    )
)}
</div>
)
    ;
};

export default UserList;
