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

    const formatSelectResult = (data) => {
        if (!data || data.length === 0) {
            return <div>Aucune donnée trouvée.</div>;
        }

        const headers = Object.keys(data[0]);
        return (
            <table className="table-auto border-collapse border border-gray-400 text-white">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-500 px-2 py-1">{header.toUpperCase()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex} className="border border-gray-500 px-2 py-1">{row[header]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const executeCommand = async (sqlCommand) => {
        setLoading(true);
        try {
            let response;
            const isSelectQuery = sqlCommand.trim().toLowerCase().startsWith("select");
            if (isSelectQuery) {
                response = await axios.get("http://localhost:8080/executeSelectSql", {
                    params: { sql: sqlCommand },
                });
                setCommands(prevCommands => [
                    ...prevCommands,
                    { type: 'input', content: sqlCommand },
                    { type: 'output', content: formatSelectResult(response.data) },
                ]);
            } else {
                response = await axios.post(`http://localhost:8080/executeSql?sql=${encodeURIComponent(sqlCommand)}`);
                setCommands(prevCommands => [
                    ...prevCommands,
                    { type: 'input', content: sqlCommand },
                    { type: 'output', content: response.data }
                ]);
            }

            setHistory([sqlCommand, ...history]);
            setCurrentCommand('');
            setHistoryIndex(-1);
        } catch (error) {
            setCommands(prevCommands => [
                ...prevCommands,
                { type: 'input', content: sqlCommand },
                { type: 'output', content: error.response?.data || 'Erreur lors de l\'exécution de la commande' }
            ]);
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && currentCommand.trim()) {
            e.preventDefault();
            executeCommand(currentCommand);
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
        <div className="max-w-5xl mx-auto p-4">
            <div
                ref={terminalRef}
                className="bg-red-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono"
            >
                {loading && <p className="text-white text-center">Chargement...</p>}
                {!loading && (
                    <div>
                        <div className="mb-4">
                            <p className="text-white">SQL Terminal - Tapez vos commandes SQL</p>
                            <p className="text-gray-500">Utilisez les flèches haut/bas pour naviguer dans l'historique</p>
                        </div>
                        {commands.map((cmd, index) => (
                            <div key={index} className="mb-2">
                                {cmd.type === 'input' ? (
                                    <div>
                                        <span className="text-blue-400">sql&gt; </span>
                                        <span>{cmd.content}</span>
                                    </div>
                                ) : (
                                    <div className="text-gray-300 ml-4">{cmd.content}</div>
                                )}
                            </div>
                        ))}
                        <div className="flex">
                            <span className="text-blue-400">sql&gt; </span>
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

export default SQLTerminal;
