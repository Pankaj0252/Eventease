import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../services/api.service';
import '../routes/auth/main.css';

const UserProfile = () => {
    const params = useParams();
    const userId = params.userId;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const result = await getSingleUser(userId);
                console.log('Fetched Single User:', result);
                setUser(result);
            } catch (error) {
                console.error('Error setting user:', error);
            }
        };

        fetchSingleUser();
    }, [userId]);

    return (
        <div className="user-profile-container">
            <div className="user-profile-card">
                <h2>User Info</h2>
                <table className="user-profile-table">
                    <tbody>
                        <tr>
                            <td><strong>Name</strong></td>
                            <td>{user?.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>{user?.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Created At</strong></td>
                            <td>{user?.createdAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserProfile;
