import React, { useState, useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/order.service';

const Payment = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);

    // Payment Details State
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePayment = async () => {
        // Validation Logic
        if (paymentMethod === 'card') {
            if (!cardNumber || !expiry || !cvv) {
                alert("Please enter all card details!");
                return;
            }
            if (cardNumber.length < 16) {
                alert("Invalid Card Number!");
                return;
            }
        } else {
            // QR Code Mode: Require Transaction ID (UTR)
            if (!upiId || upiId.length < 5) {
                alert("Please enter the Payment Transaction ID (UTR) to confirm!");
                return;
            }
        }

        setProcessing(true);

        // Simulate network delay for payment
        setTimeout(async () => {
            try {
                // Construct order object expected by backend
                const orderData = {
                    transactionId: paymentMethod === 'card' ? `CARD-${Date.now()}` : upiId,
                    items: cart.map(item => ({
                        foodId: item.foodId,
                        quantity: item.quantity
                    }))
                };

                await OrderService.createOrder(orderData);

                clearCart();
                alert(paymentMethod === 'card' ? 'Payment Successful! Order Placed. 🥘' : 'Payment Submitted for Verification! ⏳\n\nAdmin will approve your order shortly.');
                navigate('/orders');
            } catch (error) {
                console.error("Order error", error);
                if (error.response) {
                    alert(`Payment failed: ${error.response.data.message || error.response.statusText} `);
                } else if (error.request) {
                    alert('Payment processing but server is not responding. Check your connection.');
                } else {
                    alert('Payment error: ' + error.message);
                }
            } finally {
                setProcessing(false);
            }
        }, 2000); // 2 second delay
    };

    if (cart.length === 0) {
        return <div className="text-center mt-5">Your cart is empty. <a href="/menu">Go to Menu</a></div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="glass-card">
                <h2 className="text-center mb-4">💳 Checkout</h2>

                <div className="mb-4 text-center">
                    <h4>Total to Pay: <span className="text-success">₹{totalAmount.toFixed(2)}</span></h4>
                </div>

                <div className="mb-4">
                    <label className="form-label">Select Payment Method</label>
                    <div className="row g-2">
                        {/* Card */}
                        <div className="col-6">
                            <div
                                className={`p-3 border rounded text-center cursor-pointer ${paymentMethod === 'card' ? 'bg-primary text-white' : 'glass-card-hover'}`}
                                style={{ cursor: 'pointer', border: paymentMethod === 'card' ? '2px solid #fff' : '1px solid #444' }}
                                onClick={() => setPaymentMethod('card')}
                            >
                                💳 Card
                            </div>
                        </div>
                        {/* GPay */}
                        <div className="col-6">
                            <div
                                className={`p-3 border rounded text-center cursor-pointer ${paymentMethod === 'gpay' ? 'text-white' : 'glass-card-hover'}`}
                                style={{
                                    cursor: 'pointer',
                                    border: paymentMethod === 'gpay' ? '2px solid #fff' : '1px solid #444',
                                    background: paymentMethod === 'gpay' ? '#4285F4' : 'rgba(255,255,255,0.05)'
                                }}
                                onClick={() => setPaymentMethod('gpay')}
                            >
                                🔵 GPay
                            </div>
                        </div>
                        {/* PhonePe */}
                        <div className="col-6">
                            <div
                                className={`p-3 border rounded text-center cursor-pointer ${paymentMethod === 'phonepe' ? 'text-white' : 'glass-card-hover'}`}
                                style={{
                                    cursor: 'pointer',
                                    border: paymentMethod === 'phonepe' ? '2px solid #fff' : '1px solid #444',
                                    background: paymentMethod === 'phonepe' ? '#5f259f' : 'rgba(255,255,255,0.05)'
                                }}
                                onClick={() => setPaymentMethod('phonepe')}
                            >
                                🟣 PhonePe
                            </div>
                        </div>
                        {/* Paytm */}
                        <div className="col-6">
                            <div
                                className={`p-3 border rounded text-center cursor-pointer ${paymentMethod === 'paytm' ? 'text-white' : 'glass-card-hover'}`}
                                style={{
                                    cursor: 'pointer',
                                    border: paymentMethod === 'paytm' ? '2px solid #fff' : '1px solid #444',
                                    background: paymentMethod === 'paytm' ? '#00baf2' : 'rgba(255,255,255,0.05)'
                                }}
                                onClick={() => setPaymentMethod('paytm')}
                            >
                                🟦 Paytm
                            </div>
                        </div>
                    </div>
                </div>

                {paymentMethod === 'card' && (
                    <div className="mb-3 animate-fade-in">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Card Number (16 digits)"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength="16"
                        />
                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                maxLength="5"
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                maxLength="3"
                            />
                        </div>
                    </div>
                )}

                {['gpay', 'phonepe', 'paytm'].includes(paymentMethod) && (
                    <div className="mb-3 animate-fade-in text-center">
                        <div className="alert alert-info" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff' }}>
                            <small>Scan with <strong>{paymentMethod === 'gpay' ? 'Google Pay' : paymentMethod === 'phonepe' ? 'PhonePe' : 'Paytm'}</strong> to Pay <strong>₹{totalAmount.toFixed(2)}</strong></small>
                        </div>

                        <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '10px' }}>
                            <QRCodeSVG
                                value={`upi://pay?pa=7780321619@ibl&pn=Cafeteria&am=${totalAmount}&cu=INR`}
                                size={200}
                            />
                        </div >
                        <p className="mt-2 text-muted" style={{ fontSize: '0.8rem' }}>Merchant ID: 7780321619@ibl</p>

                        <div className="mt-3 text-start">
                            <label className="form-label">Transaction ID / UTR (Required)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the 12-digit UTR from your app"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                required
                            />
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Check your payment app history for this ID.</small>
                        </div>
                    </div >
                )}

                <button
                    className="btn btn-success w-100 py-2 fs-5 mt-3"
                    onClick={handlePayment}
                    disabled={processing}
                >
                    {processing ? 'Processing Payment...' : `Pay ₹${totalAmount.toFixed(2)}`}
                </button>
            </div >
        </div >
    );
};

export default Payment;
