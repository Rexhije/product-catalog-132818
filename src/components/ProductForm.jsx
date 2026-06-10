function ProductForm({ form, message, isEditing, onChange, onSubmit, onCancel }) {
    return (
        <form className="product-form" onSubmit={onSubmit}>
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

            <div className="form-grid">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={onChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={onChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={onChange}
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    value={form.rating}
                    onChange={onChange}
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={onChange}
                />

                <input
                    type="text"
                    name="brand"
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