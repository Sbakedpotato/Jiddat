import React from 'react'
import { siteContent } from '../../data/content'

const ImpactMetrics = () => {
    const { impact } = siteContent

    return (
        <section className="py-20">
            <div className="mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                        Making a Difference
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-brand-black md:text-4xl">
                        {impact.title}
                    </h2>
                    <p className="mt-2 text-lg text-brand-gray">
                        {impact.subtitle}
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {impact.metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-brand-black p-8 text-center transition-transform hover:scale-105"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-accent/20 blur-2xl group-hover:bg-brand-accent/30 transition-colors" />

                            {/* Value */}
                            <p className="relative text-4xl font-bold text-white md:text-5xl">
                                {metric.value}
                            </p>

                            {/* Label */}
                            <p className="relative mt-2 text-sm font-semibold uppercase tracking-wider text-brand-accent">
                                {metric.label}
                            </p>

                            {/* Description */}
                            <p className="relative mt-3 text-xs text-white/60 leading-relaxed">
                                {metric.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ImpactMetrics
