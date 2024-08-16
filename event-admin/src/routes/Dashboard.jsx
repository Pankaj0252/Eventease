import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'react-bootstrap-icons';
import { clearAccessToken, clearUserFromLocalstorage } from '../services/localstorage'; 
import { createUser, deleteSingleUser, updateUser, getUsers } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../routes/auth/main.css'; // Import the CSS file

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'attendee'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const result = await getUsers();
            setUsers(result);
            setTotalUsers(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const showModal = (user) => {
        if (user) {
            setIsUpdateMode(true);
            setCurrentUserId(user._id);
            setFormValues(user);
        } else {
            setIsUpdateMode(false);
            setFormValues({
                name: '',
                email: '',
                password: '',
                phone: '',
                role: 'attendee'
            });
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setCurrentUserId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleRoleChange = (role) => {
        setFormValues({
            ...formValues,
            role,
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const getFilteredUsers = () => {
        if (!searchQuery) {
            return users;
        }
        return users.filter((user) =>
            user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleCreateOrUpdateUser = async (e) => {
        e.preventDefault();
        const { name, email, password, phone, role } = formValues;

        try {
            if (isUpdateMode) {
                await updateUser(currentUserId, { name, email, password, phone, role });
            } else {
                await createUser({ name, email, password, phone, role });
            }
            fetchUsers();
            hideModal();
        } catch (error) {
            console.error('Error handling user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteSingleUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Name", "Role", "Email", "Date Created"];
        const rows = users.map(user => [
            user.name,
            user.role,
            user.email,
            user.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save('users.pdf');
    };

    return (
        <div className="container">
            <div className="dashboard-page-header">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="header-top">
                            <h3>Total List of Users: {totalUsers}</h3>
                            <div className="header-buttons">
                                <button className="btn btn-primary" onClick={() => showModal(null)}>
                                    <Plus size={18} /> New User
                                </button>
                                <button className="btn btn-success" onClick={downloadPDF}>
                                    Download PDF
                                </button>
                                <button className="btn btn-secondary" onClick={() => {
                                    clearAccessToken();
                                    clearUserFromLocalstorage();
                                    window.location.href = '/login';
                                }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="search-bar">
                            <span className="search-icon"><Search size={25} /></span>
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search Role....." 
                                onChange={handleSearchChange} 
                            />
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getFilteredUsers().map(user => (
                                    <tr key={user._id}>
                                        <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createdAt}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                                                Delete
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => showModal(user)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {isModalVisible && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <button className="close-btn" onClick={hideModal}>×</button>
                                    <h2>{isUpdateMode ? "Update User" : "Create User"}</h2>
                                    <form onSubmit={handleCreateOrUpdateUser}>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter name"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isUpdateMode}
                                            />
                                        </div>
                                        {!isUpdateMode && (
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    name="password"
                                                    value={formValues.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                value={formValues.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <select
                                                name="role"
                                                value={formValues.role}
                                                onChange={(e) => handleRoleChange(e.target.value)}
                                                required
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="event-manager">Event Manager</option>
                                                <option value="attendee">Attendee</option>
                                            </select>
                                        </div>
                                        <div className="form-actions">
                                            <button className="btn btn-secondary" onClick={hideModal}>
                                                Close
                                            </button>
                                            <button className="btn btn-primary" type="submit">
                                                {isUpdateMode ? "Update User" : "Create User"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
