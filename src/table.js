import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Table() {
    const [information, setInfo] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        fetchData(); // Initial data fetch

        const intervalId = setInterval(fetchData, 60000); // Refresh data every minute

        return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/info', {
                withCredentials: true, // Send cookies with request for authentication
            });

            if (response.status === 200) {
                setInfo(response.data);
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    

    const handleSort = (key) => {
        if (sortConfig && sortConfig === key) {
            // If already sorted by the same key, reverse the order
            setInfo([...information].reverse());
        } else {
            // Sort the data based on the clicked column key
            const sortedData = [...information].sort((a, b) =>
                a[key].localeCompare(b[key])
            );
            setInfo(sortedData);
            setSortConfig(key);
        }
    };

    return (
        <div>
            <h2>Information Table</h2>
            <table>
                <thead>
                    <tr>
                        <SortableColumnHeader
                            columnName="Employee ID"
                            sortKey="employee_id"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableColumnHeader
                            columnName="Employee Name"
                            sortKey="employee_name"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableColumnHeader
                            columnName="Project Name"
                            sortKey="project_name"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableColumnHeader
                            columnName="Start Date"
                            sortKey="start_date"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                    </tr>
                </thead>
                <tbody>
                    {information.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employee_id}</td>
                            <td>{item.employee_name}</td>
                            <td>{item.project_name}</td>
                            <td>{new Date(item.start_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SortableColumnHeader({ columnName, sortKey, sortConfig, onClick }) {
    const handleClick = () => {
        onClick(sortKey);
    };

    return (
        <th onClick={handleClick}>
            {columnName}
            {sortConfig === sortKey && <span> ▲</span>}
        </th>
    );
}
