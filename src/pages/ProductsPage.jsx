import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    const searchRef = useRef(null)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }, [loading])

    const categories = useMemo(() => {
        const productCategories = products.map(product => product.category)
        return ['all', ...new Set(productCategories)]
    }, [products])

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(search.toLowerCase())

            const matchesCategory =
                category === 'all' || product.category === category

            return matchesSearch && matchesCategory
        })
    }, [products, search, category])

    if (loading) {
        return (
            <main className="page center-page">
                <h2>Loading products...</h2>
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

    return (
        <main className="page">
            <h1>Products</h1>

            <div className="filters">
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <p className="result-count">Showing {filteredProducts.length} products</p>

            <div className="product-grid">
                {filteredProducts.map(product => {
                    const isFavorite = favorites.some(item => item.id === product.id)

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={isFavorite}
                            onToggleFavorite={toggleFavorite}
                        />
                    )
                })}
            </div>
        </main>
    )
}

export default ProductsPage