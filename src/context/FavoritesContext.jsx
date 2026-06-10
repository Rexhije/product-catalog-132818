import { createContext, useCallback, useState } from 'react'

export const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    const toggleFavorite = useCallback((product) => {
        setFavorites(prevFavorites => {
            const exists = prevFavorites.some(item => item.id === product.id)

            if (exists) {
                return prevFavorites.filter(item => item.id !== product.id)
            }

            return [...prevFavorites, product]
        })
    }, [])

    const removeFavorite = useCallback((id) => {
        setFavorites(prevFavorites =>
            prevFavorites.filter(item => item.id !== id)
        )
    }, [])

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, removeFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}