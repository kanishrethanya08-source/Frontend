import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems(prev =>
      prev.find(i => i.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlistItems.some(i => i.id === id);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems, addToWishlist, removeFromWishlist,
      toggleWishlist, isWishlisted, wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
