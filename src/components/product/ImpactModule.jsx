import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiArrowRight } from 'react-icons/fi'
import { siteContent } from '../../data/content'

const ImpactModule = ({ makerStory }) => {
    const { product: productContent } = siteContent

    return (
        <div className="rounded-2xl bg-brand-light/50 p-6">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/20">
                    <FiHeart className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-brand-black mb-2">
                        {productContent.impactModule.title}
                    </h3>
                    <p className="text-sm text-brand-dark leading-relaxed mb-4">
                        {makerStory || productContent.impactModule.defaultDescription}
                    </p>
                    <Link
                        to={productContent.impactModule.ctaLink}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:gap-3 transition-all"
                    >
                        {productContent.impactModule.ctaText}
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ImpactModule
