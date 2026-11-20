import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY  = 'glowcart_users';
const ACTIVE_KEY = 'glowcart_active_user';

// ── helpers ──────────────────────────────────────────────────────────────────
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getActiveUser() {
  try { return JSON.parse(localStorage.getItem(ACTIVE_KEY)) || null; }
  catch { return null; }
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getActiveUser);

  // Register a new user — returns { success, message }
  const signup = ({ name, email, password }) => {
    const users = getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, message: 'An account with this email already exists.' };

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,            // stored as-is (plain text, fine for a frontend demo)
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);

    // Auto-login after signup
    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt };
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    return { success: true };
  };

  // Login — returns { success, message }
  const login = ({ email, password }) => {
    const users = getUsers();
    const user  = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { success: false, message: 'Invalid email or password. Please try again.' };

    const safeUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    return { success: true };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(ACTIVE_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
