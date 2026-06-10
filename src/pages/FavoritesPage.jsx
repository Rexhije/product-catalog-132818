import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'

function FavoritesPage() {
    const { favorites, toggleFavorite } = useContext(FavoritesContext)

    if (favorites.length === 0) {
        return (
            <main className="page">
                <h1>Favorites</h1>
                <p>No favorite products yet.</p>
            </main>
        )
    }

    return (
        <main className="page">
            <h1>Favorite Products</h1>

            <div className="product-grid">
                {favorites.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </main>
    )
}

export default FavoritesPage