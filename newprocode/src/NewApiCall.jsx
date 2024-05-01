import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./NewApiCall.css"
const NewApiCall = () => {
    const [userData, setUserData] = useState([]);
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userEdit, setUserEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setUserData(res?.data);
                setOriginalData(res?.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleAddFields = () => {
        const newUser = { name: userName, phone: userPhone, email: userEmail };
        setUserData(prevData => [...prevData, newUser]);
        setUserName("");
        setUserPhone("");
        setUserEmail("");
    };

    const handleEdit = (id, name, email, phone) => {
        setEditId(id);
        setUserEdit(true);
        setUserName(name);
        setUserEmail(email);
        setUserPhone(phone);
    };

    const handleSave = () => {
        const updatedData = userData.map(user => {
            if (user.id === editId) {
                return { ...user, name: userName, email: userEmail, phone: userPhone };
            }
            return user;
        });
        setUserData(updatedData);
        setUserEdit(false);
        setEditId(null);
    };

    const handleDelete = (id) => {
        const updatedData = userData.filter(user => user.id !== id);
        setUserData(updatedData);
    };

    const handleSearch = () => {
        const results = originalData.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));
        setUserData(results);
    };

    const resetSearch = () => {
        setUserData(originalData);
        setSearchName("");
    };

    return (
        <div className="container">
            <div className="input-container">

                <input placeholder="Enter Name" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" />
                <input placeholder="Enter Phone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} type="text" />
                <input placeholder="Enter Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" />
                {userEdit ? <button onClick={handleSave}>Save</button> : <button onClick={handleAddFields}>Add</button>}
            </div>
            <div className="button-container">
                <input placeholder="Search by name..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <button onClick={resetSearch}>Reset</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id, user.name, user.email, user.phone)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewApiCall;
