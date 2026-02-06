import api from './api';

const getAllFoods = () => {
    return api.get('/foods');
};

const getAvailableFoods = () => {
    return api.get('/foods/available');
};

const getFoodsByCategory = (category) => {
    return api.get(`/foods/category/${category}`);
};

const addFood = (food) => {
    return api.post('/foods', food);
};

const updateFood = (id, food) => {
    return api.put(`/foods/${id}`, food);
};

const deleteFood = (id) => {
    return api.delete(`/foods/${id}`);
};

const FoodService = {
    getAllFoods,
    getAvailableFoods,
    getFoodsByCategory,
    addFood,
    updateFood,
    deleteFood,
};

export default FoodService;
