import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'

const emptyForm = {
    title: '',
    category: '',
    price: '',
    rating: '',
    stock: '',
    brand: '',
    description: ''
}

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState('')
    const [editingId, setEditingId] = useState(null)

    const searchRef = useRef(null)

    const { favorites, toggleFavorite, removeFavorite } = useContext(FavoritesContext)

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

            const matchesCategory = category === 'all' || product.category === category

            return matchesSearch && matchesCategory
        })
    }, [products, search, category])

    const handleFormChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const resetForm = useCallback(() => {
        setForm(emptyForm)
        setMessage('')
        setEditingId(null)
    }, [])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        if (!form.title.trim()) {
            setMessage('Title is required')
            return
        }

        if (!form.category.trim()) {
            setMessage('Category is required')
            return
        }

        if (editingId !== null) {
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === editingId
                        ? {
                            ...product,
                            title: form.title,
                            category: form.category,
                            price: Number(form.price) || 0,
                            rating: Number(form.rating) || 0,
                            stock: Number(form.stock) || 0,
                            brand: form.brand,
                            description: form.description
                        }
                        : product
                )
            )
        } else {
            const newProduct = {
                id: Date.now(),
                title: form.title,
                category: form.category,
                price: Number(form.price) || 0,
                rating: Number(form.rating) || 0,
                stock: Number(form.stock) || 0,
                brand: form.brand || 'Local Brand',
                description: form.description,
                isLocal: true
            }

            setProducts(prevProducts => [newProduct, ...prevProducts])
        }

        resetForm()
    }, [form, editingId, resetForm])

    const startEdit = useCallback((product) => {
        setEditingId(product.id)

        setForm({
            title: product.title || '',
            category: product.category || '',
            price: String(product.price || ''),
            rating: String(product.rating || ''),
            stock: String(product.stock || ''),
            brand: product.brand || '',
            description: product.description || ''
        })

        setMessage('')
    }, [])

    const deleteProduct = useCallback((id) => {
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== id)
        )

        removeFavorite(id)

        if (editingId === id) {
            resetForm()
        }
    }, [editingId, removeFavorite, resetForm])

    if (loading) {
        return (
            <main className="page">
                <h2>Loading products...</h2>
            </main>
        )
    }

    if (error) {
        return (
            <main className="page">
                <h2>Error: {error}</h2>
            </main>
        )
    }

    return (
        <main className="page">
            <h1>Products</h1>

            <ProductForm
                form={form}
                message={message}
                isEditing={editingId !== null}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                onCancel={resetForm}
            />

            <div className="filters">
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <p className="result-count">
                Showing {filteredProducts.length} products
            </p>

            <div className="product-grid">
                {filteredProducts.map(product => {
                    const isFavorite = favorites.some(item => item.id === product.id)

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={isFavorite}
                            onToggleFavorite={toggleFavorite}
                            onEdit={startEdit}
                            onDelete={deleteProduct}
                        />
                    )
                })}
            </div>
        </main>
    )
}

export default ProductsPage