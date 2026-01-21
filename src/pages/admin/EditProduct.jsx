import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiSave, FiImage, FiTag } from 'react-icons/fi'
import { api } from '../../services/api'

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const AVAILABLE_COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Ivory', hex: '#FFFFF0' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Sage', hex: '#9DC183' },
    { name: 'Dusty Rose', hex: '#DCAE96' },
    { name: 'Terracotta', hex: '#E2725B' },
    { name: 'Indigo', hex: '#4B0082' },
    { name: 'Cream', hex: '#FFFDD0' },
    { name: 'Charcoal', hex: '#36454F' },
]

export default function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        inventory_status: 'In Stock',
        sizes: [],
        colors: [],
        material: '',
        care_instructions: '',
        fit: '',
        maker_story: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [product, cats] = await Promise.all([
                    api.getAdminProduct(id),
                    api.getCategoryShortcuts()
                ])

                // Parse JSON fields if needed
                const parseSizes = (val) => {
                    if (!val) return []
                    if (Array.isArray(val)) return val
                    try { return JSON.parse(val) } catch { return [] }
                }
                const parseColors = (val) => {
                    if (!val) return []
                    if (Array.isArray(val)) return val
                    try { return JSON.parse(val) } catch { return [] }
                }

                setFormData({
                    title: product.title || '',
                    description: product.description || '',
                    price: product.price || '',
                    category_id: product.category_id || '',
                    image_url: product.image_url || '',
                    inventory_status: product.inventory_status || 'In Stock',
                    sizes: parseSizes(product.sizes),
                    colors: parseColors(product.colors),
                    material: product.material || '',
                    care_instructions: product.care_instructions || '',
                    fit: product.fit || '',
                    maker_story: product.maker_story || '',
                })
                setCategories(cats || [])
            } catch (err) {
                setError('Failed to load product data')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }))
    }

    const toggleColor = (color) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.some(c => c.name === color.name)
                ? prev.colors.filter(c => c.name !== color.name)
                : [...prev.colors, color]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            await api.updateProduct(id, formData)
            navigate('/admin/products')
        } catch (err) {
            setError('Failed to update product')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="text-center py-12 text-brand-gray">Loading product...</div>

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/admin/products" className="p-2 hover:bg-brand-light rounded-full transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-brand-gray" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-brand-black tracking-tight">Edit Product</h1>
                    <p className="text-brand-gray mt-1">Update product details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-center">
                        {error}
                    </div>
                )}

                {/* Basic Info */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light space-y-6">
                    <h2 className="text-lg font-bold text-brand-black">Basic Information</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Product Title</label>
                        <div className="relative group">
                            <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
                            <input
                                type="text"
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="e.g. Embroidered Linen Blouse"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full p-4 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium resize-none"
                            placeholder="Describe the product..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Price (Rs.)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="2500"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Category</label>
                            <select
                                required
                                className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name || cat.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Inventory Status</label>
                            <select
                                className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                value={formData.inventory_status}
                                onChange={(e) => setFormData({ ...formData, inventory_status: e.target.value })}
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Fit</label>
                            <select
                                className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                value={formData.fit}
                                onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                            >
                                <option value="">Select Fit</option>
                                <option value="Relaxed">Relaxed</option>
                                <option value="Regular">Regular</option>
                                <option value="Fitted">Fitted</option>
                                <option value="Oversized">Oversized</option>
                                <option value="A-Line">A-Line</option>
                                <option value="Flowy">Flowy</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Image URL</label>
                        <div className="relative group">
                            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
                            <input
                                type="url"
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Sizes & Colors */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light space-y-6">
                    <h2 className="text-lg font-bold text-brand-black">Sizes & Colors</h2>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-brand-black ml-1">Available Sizes</label>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_SIZES.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleSize(size)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.sizes.includes(size)
                                            ? 'bg-brand-black text-white'
                                            : 'bg-brand-light text-brand-dark hover:bg-brand-light/80'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-brand-black ml-1">Available Colors</label>
                        <div className="flex flex-wrap gap-3">
                            {AVAILABLE_COLORS.map(color => (
                                <button
                                    key={color.name}
                                    type="button"
                                    onClick={() => toggleColor(color)}
                                    title={color.name}
                                    className={`h-10 w-10 rounded-full border-2 transition-all ${formData.colors.some(c => c.name === color.name)
                                            ? 'border-brand-black scale-110 ring-2 ring-brand-accent/30'
                                            : 'border-gray-200 hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                />
                            ))}
                        </div>
                        {formData.colors.length > 0 && (
                            <p className="text-sm text-brand-gray ml-1">
                                Selected: {formData.colors.map(c => c.name).join(', ')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Material & Care */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light space-y-6">
                    <h2 className="text-lg font-bold text-brand-black">Material & Care</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Material</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                            placeholder="e.g. 100% Linen, Cotton Blend"
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Care Instructions</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                            placeholder="e.g. Hand wash cold. Lay flat to dry."
                            value={formData.care_instructions}
                            onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
                        />
                    </div>
                </div>

                {/* Artisan Story */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light space-y-6">
                    <h2 className="text-lg font-bold text-brand-black">Artisan Story</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Maker Story</label>
                        <textarea
                            rows={3}
                            className="w-full p-4 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium resize-none"
                            placeholder="Share the story of the artisan who crafted this piece..."
                            value={formData.maker_story}
                            onChange={(e) => setFormData({ ...formData, maker_story: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        to="/admin/products"
                        className="px-8 py-4 rounded-2xl font-bold text-brand-gray hover:bg-brand-light transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-brand-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-dark transform hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving ? 'Saving...' : (
                            <>
                                <FiSave className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
