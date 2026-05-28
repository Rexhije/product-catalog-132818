import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Product Catalog
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}

export default Navbar