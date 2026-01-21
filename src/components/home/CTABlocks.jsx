import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { siteContent } from '../../data/content'

const CTABlocks = () => {
    const { ctaBlocks } = siteContent

    return (
        <section className="py-20">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Shop CTA */}
                <div className="group relative overflow-hidden rounded-3xl bg-brand-light p-10 md:p-12">
                    {/* Decorative Element */}
                    <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl transition-all group-hover:bg-brand-accent/20" />

                    <div className="relative">
                        <h3 className="text-2xl font-bold text-brand-black md:text-3xl">
                            {ctaBlocks.shop.title}
                        </h3>
                        <p className="mt-4 text-brand-gray max-w-sm leading-relaxed">
                            {ctaBlocks.shop.description}
                        </p>
                        <Link
                            to={ctaBlocks.shop.link}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-black px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-brand-dark"
                        >
                            {ctaBlocks.shop.buttonText}
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>

                {/* Donate CTA */}
                <div className="group relative overflow-hidden rounded-3xl bg-brand-black p-10 md:p-12">
                    {/* Decorative Element */}
                    <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-accent/30 blur-3xl transition-all group-hover:bg-brand-accent/40" />

                    <div className="relative">
                        <h3 className="text-2xl font-bold text-white md:text-3xl">
                            {ctaBlocks.donate.title}
                        </h3>
                        <p className="mt-4 text-white/70 max-w-sm leading-relaxed">
                            {ctaBlocks.donate.description}
                        </p>
                        <Link
                            to={ctaBlocks.donate.link}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-brand-accent-dark"
                        >
                            {ctaBlocks.donate.buttonText}
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTABlocks
