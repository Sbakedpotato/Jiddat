import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiStar, FiTruck, FiHeart, FiCheck } from 'react-icons/fi'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/common/ProductCard'
import ImpactModule from '../components/product/ImpactModule'
import { siteContent } from '../data/content'

const ProductPage = () => {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const { toggle, items } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [related, setRelated] = useState([])
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const detail = await api.getProductDetail(productId)
        setProduct(detail)
        // Parse sizes and colors
        if (detail?.sizes) {
          const sizes = typeof detail.sizes === 'string' ? JSON.parse(detail.sizes) : detail.sizes
          if (sizes.length) setSelectedSize(sizes[0])
        }
        if (detail?.colors) {
          const colors = typeof detail.colors === 'string' ? JSON.parse(detail.colors) : detail.colors
          if (colors.length) setSelectedColor(colors[0])
        }
        if (detail?.categoryId) {
          const similar = await api.getProductsByCategory(detail.categoryId)
          setRelated(similar.filter((item) => item.id !== productId))
        }
      } catch (err) {
        setError('Product not found or unavailable.')
      }
    }
    load()
    window.scrollTo(0, 0)
    setAddedToCart(false)
  }, [productId])

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-brand-gray">{error}</div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="h-[500px] bg-brand-light/50 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 w-32 bg-brand-light/50 rounded-xl" />
            <div className="h-12 w-3/4 bg-brand-light/50 rounded-xl" />
            <div className="h-6 w-1/2 bg-brand-light/50 rounded-lg" />
            <div className="h-32 bg-brand-light/50 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  // Parse product data
  const sizes = product.sizes ? (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : []
  const colors = product.colors ? (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) : []
  const images = product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [product.image || product.imageUrl]

  const handleAddToCart = () => {
    if (sizes.length && !selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart({
      ...product,
      selectedSize: selectedSize,
      selectedColor: selectedColor?.name,
    }, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const inWishlist = items.some((item) => item.id === product.id)

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    await toggle(product)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Product Hero */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-light/30">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover transition-all duration-500"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-brand-gray">
                No image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${activeImage === idx ? 'border-brand-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Category */}
          <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
            {product.categoryLabel || product.categoryId}
          </p>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight text-brand-black md:text-4xl">
            {product.title}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <FiStar className="fill-current text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-brand-gray">
                {product.reviewCount} reviews
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-brand-black">
              Rs. {product.price?.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-brand-gray line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-white">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-brand-dark leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {colors.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-3">
                Color: {selectedColor?.name}
              </label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${selectedColor?.name === color.name
                        ? 'border-brand-black scale-110'
                        : 'border-transparent hover:scale-105'
                      }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-3">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${selectedSize === size
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

          {/* Material & Care */}
          {(product.material || product.fit) && (
            <div className="grid grid-cols-2 gap-4">
              {product.material && (
                <div className="rounded-xl bg-brand-light/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-gray mb-1">Material</p>
                  <p className="text-sm font-medium text-brand-black">{product.material}</p>
                </div>
              )}
              {product.fit && (
                <div className="rounded-xl bg-brand-light/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-gray mb-1">Fit</p>
                  <p className="text-sm font-medium text-brand-black">{product.fit}</p>
                </div>
              )}
            </div>
          )}

          {product.careInstructions && (
            <div className="rounded-xl bg-brand-light/30 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gray mb-1">Care Instructions</p>
              <p className="text-sm text-brand-dark">{product.careInstructions}</p>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t border-brand-light">
            <div className="flex h-12 items-center rounded-full border border-brand-light bg-white px-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-xl text-brand-gray hover:text-brand-black"
              >
                −
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-xl text-brand-gray hover:text-brand-black"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`h-12 flex-1 rounded-full font-bold text-white transition-all ${addedToCart
                  ? 'bg-brand-success'
                  : 'bg-brand-black hover:bg-brand-dark active:scale-95'
                }`}
            >
              {addedToCart ? (
                <span className="flex items-center justify-center gap-2">
                  <FiCheck /> Added to Cart
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
            <button
              onClick={handleWishlist}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${inWishlist
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-brand-light text-brand-dark hover:border-brand-accent hover:text-brand-accent'
                }`}
            >
              <FiHeart className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-3 text-sm text-brand-gray">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light/50">
              <FiTruck size={14} />
            </div>
            <span>{siteContent.product.shipping.freeShippingMessage}</span>
          </div>

          {/* Impact Module */}
          <ImpactModule makerStory={product.makerStory} />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-brand-light pt-16">
          <h2 className="mb-8 text-2xl font-bold text-brand-black">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductPage
