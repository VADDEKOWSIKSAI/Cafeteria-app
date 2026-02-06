import { useState } from "react";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await authService.forgotPassword(email);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Forgot Password 🔑</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                        <Link to="/login" className="btn btn-secondary w-100 text-decoration-none d-flex align-items-center justify-content-center">Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
