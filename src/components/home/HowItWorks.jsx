import React from 'react'
import { FiBook, FiHeart, FiDollarSign } from 'react-icons/fi'
import { siteContent } from '../../data/content'

const iconMap = {
    train: FiBook,
    create: FiHeart,
    earn: FiDollarSign,
}

const HowItWorks = () => {
    const { howItWorks } = siteContent

    return (
        <section className="py-20 bg-brand-light/30 rounded-3xl">
            <div className="mx-auto max-w-5xl px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                        The Process
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-brand-black md:text-4xl">
                        {howItWorks.title}
                    </h2>
                    <p className="mt-2 text-lg text-brand-gray">
                        {howItWorks.subtitle}
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-8 md:grid-cols-3">
                    {howItWorks.steps.map((step, index) => {
                        const Icon = iconMap[step.icon] || FiHeart
                        return (
                            <div
                                key={index}
                                className="relative text-center p-8 bg-brand-white rounded-2xl shadow-soft"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-brand-accent text-white text-sm font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
                                    <Icon className="h-7 w-7 text-brand-accent" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-brand-black mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-brand-gray leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-brand-accent/20 -z-10" />
            </div>
        </section>
    )
}

export default HowItWorks
