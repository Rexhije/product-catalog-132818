import { Link } from 'react-router-dom'

function ProductCard({ product, isFavorite, onToggleFavorite, onEdit, onDelete }) {
    return (
        <div className="product-card">
            <h2>{product.title}</h2>
            <p className="category">Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p className="description">{product.description}</p>

            <div className="card-actions">
                <button onClick={() => onToggleFavorite(product)}>
                    {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                </button>

                {!product.isLocal && (
                    <Link to={`/products/${product.id}`} className="details-link">
                        View Details
                    </Link>
                )}

                {onEdit && (
                    <button onClick={() => onEdit(product)} className="secondary-button">
                        Edit
                    </button>
                )}

                {onDelete && (
                    <button onClick={() => onDelete(product.id)} className="danger-button">
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductCard