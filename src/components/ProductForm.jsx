function ProductForm({ form, message, isEditing, onChange, onSubmit, onCancel }) {
    return (
        <form onSubmit={onSubmit} className="product-form">
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

            <div className="form-grid">
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={onChange}
                />

                <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={onChange}
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={onChange}
                />

                <input
                    name="rating"
                    type="number"
                    placeholder="Rating"
                    value={form.rating}
                    onChange={onChange}
                />

                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={onChange}
                />

                <input
                    name="brand"
                    type="text"
                    placeholder="Brand"
                    value={form.brand}
                    onChange={onChange}
                />
            </div>

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={onChange}
            />

            <div className="form-actions">
                <button type="submit" className="primary-button">
                    {isEditing ? 'Save Changes' : 'Add Product'}
                </button>

                {isEditing && (
                    <button type="button" onClick={onCancel} className="secondary-button">
                        Cancel Edit
                    </button>
                )}
            </div>

            {message && <p className="error-message">{message}</p>}
        </form>
    )
}

export default ProductForm