import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <main className="page hero">
            <div>
                <p className="small-title">React Final Project</p>
                <h1>Product Catalog App</h1>
                <p>
                    Browse products from a real public API, search by name, filter by category,
                    view product details and save your favorite items.
                </p>

                <Link to="/products" className="primary-button">
                    View Products
                </Link>
            </div>
        </main>
    )
}

export default HomePage