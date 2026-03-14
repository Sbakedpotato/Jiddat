import React from 'react'
import { Link } from 'react-router-dom'
import { siteContent } from '../../data/content'

const HeroSection = () => {
    const { hero, brand } = siteContent

    return (
        <section className="relative overflow-hidden rounded-3xl bg-brand-light">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={hero.backgroundImage}
                    alt=""
                    className="h-full w-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/95 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative px-8 py-20 md:px-16 md:py-28 lg:py-36">
                <div className="max-w-2xl">
                    {/* Brand Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-white/80 px-4 py-2 backdrop-blur-sm">
                        <span className="text-sm font-bold text-brand-black">{brand.name}</span>
                        <span className="text-xs text-brand-accent">{brand.tagline}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl font-bold leading-tight text-brand-black md:text-5xl lg:text-6xl">
                        {hero.headline}
                    </h1>

                    {/* Subheadline */}
                    <p className="mt-6 text-lg leading-relaxed text-brand-dark md:text-xl max-w-xl">
                        {hero.subheadline}
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center rounded-full bg-brand-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
                        >
                            {hero.ctaShop}
                        </Link>
                        <Link
                            to="/donate"
                            className="inline-flex items-center justify-center rounded-full border-2 border-brand-accent bg-transparent px-8 py-4 text-sm font-bold text-brand-accent transition-all hover:bg-brand-accent hover:text-white"
                        >
                            {hero.ctaDonate}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-brand-accent/10 blur-3xl" />
        </section>
    )
}

export default HeroSection
