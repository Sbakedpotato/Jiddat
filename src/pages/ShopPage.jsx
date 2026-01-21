import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import NavBar from '../components/layout/NavBar'
import { api } from '../services/api'
import { siteContent } from '../data/content'

const pageSize = 12

const sortProducts = (products, sortKey) => {
    switch (sortKey) {
        case 'priceLow':
            return [...products].sort((a, b) => a.price - b.price)
        case 'priceHigh':
            return [...products].sort((a, b) => b.price - a.price)
        case 'newest':
            return [...products].sort((a, b) => b.id.localeCompare(a.id))
        default:
            return products
    }
}

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''
    const categoryFilter = searchParams.get('category') || 'all'

    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [sort, setSort] = useState('featured')
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sizes: [],
        colors: [],
    })
    const [page, setPage] = useState(1)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const [productData, categoryData] = await Promise.all([
                    api.searchProducts(q, categoryFilter),
                    api.getCategoryShortcuts(),
                ])
                setAllProducts(productData || [])
                setCategories(categoryData || [])
                setError('')
            } catch (err) {
                setError('Unable to load products.')
                setAllProducts([])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [q, categoryFilter])

    // Extract available sizes and colors from products
    const availableSizes = useMemo(() => {
        const sizes = new Set()
        allProducts.forEach(p => {
            if (p.sizes) {
                const parsed = typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes
                parsed.forEach(s => sizes.add(s))
            }
        })
        return Array.from(sizes)
    }, [allProducts])

    const availableColors = useMemo(() => {
        const colors = []
        const seen = new Set()
        allProducts.forEach(p => {
            if (p.colors) {
                const parsed = typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors
                parsed.forEach(c => {
                    if (!seen.has(c.name)) {
                        seen.add(c.name)
                        colors.push(c)
                    }
                })
            }
        })
        return colors
    }, [allProducts])

    const filteredProducts = useMemo(() => {
        let list = [...allProducts]
        if (filters.minPrice) list = list.filter(item => item.price >= Number(filters.minPrice))
        if (filters.maxPrice) list = list.filter(item => item.price <= Number(filters.maxPrice))
        if (filters.sizes.length) {
            list = list.filter(item => {
                const productSizes = typeof item.sizes === 'string' ? JSON.parse(item.sizes) : (item.sizes || [])
                return filters.sizes.some(s => productSizes.includes(s))
            })
        }
        if (filters.colors.length) {
            list = list.filter(item => {
                const productColors = typeof item.colors === 'string' ? JSON.parse(item.colors) : (item.colors || [])
                return filters.colors.some(c => productColors.some(pc => pc.name === c))
            })
        }
        return sortProducts(list, sort)
    }, [allProducts, filters, sort])

    const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize)
    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1

    useEffect(() => {
        setPage(1)
    }, [filters, sort, q, categoryFilter])

    const handleCategoryChange = (catId) => {
        const newParams = new URLSearchParams(searchParams)
        if (catId === 'all') {
            newParams.delete('category')
        } else {
            newParams.set('category', catId)
        }
        setSearchParams(newParams)
    }

    const toggleSize = (size) => {
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }))
    }

    const toggleColor = (colorName) => {
        setFilters(prev => ({
            ...prev,
            colors: prev.colors.includes(colorName)
                ? prev.colors.filter(c => c !== colorName)
                : [...prev.colors, colorName]
        }))
    }

    const clearFilters = () => {
        setFilters({ minPrice: '', maxPrice: '', sizes: [], colors: [] })
        handleCategoryChange('all')
    }

    const activeFilterCount = filters.sizes.length + filters.colors.length +
        (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0) +
        (categoryFilter !== 'all' ? 1 : 0)

    return (
        <div className="pb-20">
            {/* Category Navigation - Only on Shop Page */}
            <div className="-mx-6 -mt-12 mb-8">
                <NavBar />
            </div>

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brand-black md:text-4xl">
                    {q ? `Results for "${q}"` : 'Shop Collection'}
                </h1>
                <p className="mt-2 text-brand-gray">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} • Handcrafted with purpose
                </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Sidebar Filters */}
                <div className="lg:w-64 lg:flex-shrink-0">
                    <div className="sticky top-24">
                        {/* Mobile Filter Toggle */}
                        <button
                            className="mb-4 flex w-full items-center justify-between rounded-xl border border-brand-light bg-white px-4 py-3 font-medium text-brand-black lg:hidden"
                            onClick={() => setMobileFiltersOpen(prev => !prev)}
                        >
                            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                            <span className="text-xs text-brand-gray">{mobileFiltersOpen ? 'Hide' : 'Show'}</span>
                        </button>

                        <div className={`space-y-6 ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                            {/* Categories */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-black">
                                    Category
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleCategoryChange('all')}
                                        className={`block w-full text-left text-sm py-1.5 transition-colors ${categoryFilter === 'all' ? 'text-brand-accent font-medium' : 'text-brand-gray hover:text-brand-black'
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.id)}
                                            className={`block w-full text-left text-sm py-1.5 transition-colors ${categoryFilter === cat.id ? 'text-brand-accent font-medium' : 'text-brand-gray hover:text-brand-black'
                                                }`}
                                        >
                                            {cat.name || cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            {availableSizes.length > 0 && (
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-black">
                                        Size
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.sizes.includes(size)
                                                    ? 'bg-brand-black text-white'
                                                    : 'bg-brand-light text-brand-dark hover:bg-brand-light/80'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Filter */}
                            {availableColors.length > 0 && (
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-black">
                                        Color
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {availableColors.map(color => (
                                            <button
                                                key={color.name}
                                                onClick={() => toggleColor(color.name)}
                                                title={color.name}
                                                className={`h-8 w-8 rounded-full border-2 transition-all ${filters.colors.includes(color.name)
                                                    ? 'border-brand-black scale-110'
                                                    : 'border-transparent hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: color.hex }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Filter */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-black">
                                    Price (Rs.)
                                </h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        className="w-full rounded-lg border border-brand-light bg-white px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
                                    />
                                    <span className="text-brand-gray">–</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        className="w-full rounded-lg border border-brand-light bg-white px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm font-medium text-brand-accent hover:underline"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {/* Sort */}
                    <div className="mb-6 flex items-center justify-end">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="appearance-none rounded-lg border-none bg-brand-light/50 py-2.5 pl-4 pr-10 text-sm font-medium text-brand-black focus:ring-0 cursor-pointer hover:bg-brand-light transition-colors"
                        >
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="priceLow">Price: Low to High</option>
                            <option value="priceHigh">Price: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="text-center py-24 text-brand-gray">Loading...</div>
                    ) : error ? (
                        <div className="rounded-2xl bg-red-50 p-12 text-center text-red-600">{error}</div>
                    ) : paginated.length ? (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginated.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-16 flex justify-center gap-2">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setPage(index + 1)}
                                            className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${page === index + 1
                                                ? 'bg-brand-black text-white'
                                                : 'bg-transparent text-brand-gray hover:bg-brand-light'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-light py-24 text-center">
                            <p className="text-lg font-medium text-brand-black">No products found</p>
                            <p className="text-sm text-brand-gray mt-2">Try adjusting your filters</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-sm font-semibold text-brand-accent hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShopPage
