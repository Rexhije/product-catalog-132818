import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'

function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { favorites, toggleFavorite } = useContext(FavoritesContext)

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <main className="page center-page">
                <h2>Loading product details...</h2>
            </main>
        )
    }

    if (error) {
        return (
            <main className="page center-page">
                <h2>Error: {error}</h2>
            </main>
        )
    }

    const isFavorite = favorites.some(item => item.id === product.id)

    return (
        <main className="page">
            <Link to="/products" className="back-link">
                Back to Products
            </Link>

            <div className="details-card">
                <h1>{product.title}</h1>
                <p className="category">Category: {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Rating:</strong> {product.rating}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p className="description">{product.description}</p>

                <button onClick={() => toggleFavorite(product)} className="primary-button">
                    {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                </button>
            </div>
        </main>
    )
}

export default ProductDetailsPage