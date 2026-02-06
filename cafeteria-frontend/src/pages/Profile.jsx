import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserService from '../services/user.service';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState(currentUser?.username || ''); // AuthContext maps name/email differently sometimes, check this
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            // If currentUser has name property directly
            if (currentUser.name) setName(currentUser.name);
            // Or if it's inside user object
            else if (currentUser.user && currentUser.user.name) setName(currentUser.user.name);

            if (currentUser.email) setEmail(currentUser.email);
        }
    }, [currentUser]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await UserService.updateProfile(name, email);
            setMessage('Profile updated successfully!');
            // Ideally update context too, but refresh works for now
        } catch (error) {
            setMessage('Error updating profile: ' + (error.response?.data || error.message));
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            await UserService.updatePassword(password);
            setMessage('Password updated successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage('Error updating password: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="glass-card">
                <h2 className="text-center mb-4">👤 My Profile</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleProfileUpdate} className="mb-5">
                    <h4>Update Details</h4>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled // Often email change requires re-verification, keeping it simple or disabled
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>

                <hr />

                <form onSubmit={handlePasswordUpdate}>
                    <h4>Change Password</h4>
                    <div className="mb-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
