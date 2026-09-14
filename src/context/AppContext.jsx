import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { vehicles as baseVehicles } from "../data/vehicles";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  favorites: "favoriteVehicles",
  compare: "compareVehicles",
  user: "userData",
  listings: "sellerListings",
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private browsing, quota) — fail silently, state still works in-memory
  }
}

const MAX_COMPARE = 3;

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, []));
  const [compareList, setCompareList] = useState(() => readStorage(STORAGE_KEYS.compare, []));
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.user, null));
  const [sellerListings, setSellerListings] = useState(() => readStorage(STORAGE_KEYS.listings, []));
  const [toasts, setToasts] = useState([]);

  useEffect(() => writeStorage(STORAGE_KEYS.favorites, favorites), [favorites]);
  useEffect(() => writeStorage(STORAGE_KEYS.compare, compareList), [compareList]);
  useEffect(() => writeStorage(STORAGE_KEYS.user, user), [user]);
  useEffect(() => writeStorage(STORAGE_KEYS.listings, sellerListings), [sellerListings]);

  const allVehicles = [...baseVehicles, ...sellerListings];

  const showToast = useCallback((message, variant = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((v) => v !== id) : [...prev, id];
        showToast(exists ? "Removed from favorites" : "Added to favorites", exists ? "secondary" : "success");
        return next;
      });
    },
    [showToast]
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const addToCompare = useCallback(
    (id) => {
      setCompareList((prev) => {
        if (prev.includes(id)) return prev;
        if (prev.length >= MAX_COMPARE) {
          showToast(`You can compare up to ${MAX_COMPARE} vehicles at a time`, "warning");
          return prev;
        }
        showToast("Added to comparison", "success");
        return [...prev, id];
      });
    },
    [showToast]
  );

  const removeFromCompare = useCallback((id) => {
    setCompareList((prev) => prev.filter((v) => v !== id));
  }, []);

  const isInCompare = useCallback((id) => compareList.includes(id), [compareList]);

  const clearCompare = useCallback(() => setCompareList([]), []);

  const login = useCallback(
    ({ identifier, remember }) => {
      const mockUser = {
        name: identifier.includes("@") ? identifier.split("@")[0] : "User",
        email: identifier.includes("@") ? identifier : `${identifier}@example.com`,
        mobile: identifier.includes("@") ? "" : identifier,
        remember: !!remember,
        joinedAt: new Date().toISOString(),
      };
      setUser(mockUser);
      showToast(`Welcome back, ${mockUser.name}!`, "success");
      return mockUser;
    },
    [showToast]
  );

  const register = useCallback(
    (data) => {
      const mockUser = {
        name: data.fullName,
        email: data.email,
        mobile: data.mobile,
        city: data.city,
        joinedAt: new Date().toISOString(),
      };
      setUser(mockUser);
      showToast("Account created successfully!", "success");
      return mockUser;
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast("You've been logged out", "secondary");
  }, [showToast]);

  const addListing = useCallback(
    (listing) => {
      const newListing = {
        ...listing,
        id: 1000 + sellerListings.length + Math.floor(Math.random() * 1000),
        isUserListing: true,
        createdAt: new Date().toISOString(),
      };
      setSellerListings((prev) => [newListing, ...prev]);
      showToast("Listing submitted successfully!", "success");
      return newListing;
    },
    [sellerListings, showToast]
  );

  const value = {
    vehicles: allVehicles,
    favorites,
    toggleFavorite,
    isFavorite,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    maxCompare: MAX_COMPARE,
    user,
    login,
    register,
    logout,
    sellerListings,
    addListing,
    toasts,
    showToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
