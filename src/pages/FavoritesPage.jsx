import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'

function FavoritesPage() {
    const { favorites, toggleFavorite } = useContext(FavoritesContext)

    if (favorites.length === 0) {
        return (
            <main className="page center-page">
                <h1>Favorites</h1>
                <p>You have not added any favorite products yet.</p>
            </main>
        )
    }

    return (
        <main className="page">
            <h1>Favorites</h1>
            <p className="result-count">You have {favorites.length} favorite products.</p>

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