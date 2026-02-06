import api from './api';

const createOrder = (order) => {
    return api.post('/orders', order);
};

const getMyOrders = () => {
    return api.get('/orders/my-orders');
};

const getAllOrders = () => {
    return api.get('/orders');
};

const updateOrderStatus = (id, status) => {
    return api.put(`/orders/${id}/status?status=${status}`);
};

const getKitchenOrders = () => {
    return api.get('/orders/kitchen');
};

const OrderService = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    getKitchenOrders,
};

export default OrderService;
