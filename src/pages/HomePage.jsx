import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <main className="page home-page">
            <h1>Product Catalog App</h1>

            <p>
                This application displays products from a public REST API.
                Users can search products, filter products by category, view details,
                add products to favorites, and manage products.
            </p>

            <Link to="/products" className="primary-button">
                View Products
            </Link>
        </main>
    )
}

export default HomePage