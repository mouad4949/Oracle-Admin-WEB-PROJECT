import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SQLTerminal = () => {
    const [commands, setCommands] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [commands]);

    const executeCommand = async (sqlCommand) => {
        setLoading(true);
        try {
            let response;
            const isSelectQuery = sqlCommand.trim().toLowerCase().startsWith("select");
            if (isSelectQuery) {
                response = await axios.get("http://localhost:8080/executeSelectSql", {
                    params: {sql: sqlCommand}, // Pass the SQL as a query parameter
                });
                setCommands(prevCommands => [
                    ...prevCommands,
                    {type: 'input', content: sqlCommand},
                    {type: 'output', content: JSON.stringify(response.data, null, 2)},
                ]);
            } else {
                response = await axios.post("http://localhost:8080/executeSql", sqlCommand);
                setCommands(prevCommands => [
                    ...prevCommands,
                    {type: 'input', content: sqlCommand},
                    {type: 'output', content: response.data}
                ]);
            }

            setHistory([sqlCommand, ...history]);
            setCurrentCommand('');
            setHistoryIndex(-1);


            } catch (error) {
                // setCommands(prevCommands => [
                //     ...prevCommands,
                //     { type: 'input', content: sqlCommand },
                //     {type: 'output', content: error.response?.data || 'Error processing command'}
                // ]);
            }
            setLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && currentCommand.trim()) {
            e.preventDefault();
            executeCommand(currentCommand)

        }


        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIndex = Math.min(historyIndex + 1, history.length - 1);
            setHistoryIndex(nextIndex);
            if (nextIndex >= 0 && history[nextIndex]) {
                setCurrentCommand(history[nextIndex]);
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = Math.max(historyIndex - 1, -1);
            setHistoryIndex(nextIndex);
            if (nextIndex >= 0) {
                setCurrentCommand(history[nextIndex]);
            } else {
                setCurrentCommand('');
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div
                ref={terminalRef}
                className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono"
            >
                {loading && <p className="text-white text-center">Loading...</p> }
                {!loading && (
                    <div>
                        <div className="mb-4">
                            {/* En-tête du terminal */}
                            <p className="text-white">SQL Terminal - Tapez vos commandes SQL</p>
                            <p className="text-gray-500">Utilisez les flèches haut/bas pour naviguer dans l'historique</p>
                        </div>

                        {/* Historique des commandes */}
                        {commands.map((cmd, index) => (
                            <div key={index} className="mb-2">
                                {cmd.type === 'input' ? (
                                    <div>
                                        <span className="text-blue-400">sql> </span>
                                        <span>{cmd.content}</span>
                                    </div>
                                ) : (
                                    <div className="text-gray-300 ml-4">{cmd.content}</div>
                                )}
                            </div>
                        ))}
                        {/* Ligne de commande active */}
                        <div className="flex">
                            <span className="text-blue-400">sql> </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentCommand}
                                onChange={(e) => setCurrentCommand(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent outline-none border-none ml-2"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
}

export default SQLTerminal;