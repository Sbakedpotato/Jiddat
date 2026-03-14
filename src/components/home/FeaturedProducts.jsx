import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProductCard from '../common/ProductCard'
import { siteContent } from '../../data/content'

const FeaturedProducts = ({ products = [] }) => {
    const { featuredProducts } = siteContent

    if (!products.length) return null

    return (
        <section className="py-20">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                        Handcrafted
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">
                        {featuredProducts.title}
                    </h2>
                    <p className="mt-2 text-brand-gray">
                        {featuredProducts.subtitle}
                    </p>
                </div>
                <Link
                    to={featuredProducts.ctaLink}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:gap-3 transition-all"
                >
                    {featuredProducts.ctaText}
                    <FiArrowRight />
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default FeaturedProducts
