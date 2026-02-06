import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (food) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.foodId === food.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.foodId === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { foodId: food.id, name: food.name, price: food.price, quantity: 1, imageUrl: food.imageUrl }];
            }
        });
    };

    const removeFromCart = (foodId) => {
        setCart((prevCart) => prevCart.filter((item) => item.foodId !== foodId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (foodId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(foodId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.foodId === foodId ? { ...item, quantity } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
