import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiUsers, FiAward, FiGlobe } from 'react-icons/fi'
import { siteContent } from '../data/content'

const OurStoryPage = () => {
    const { ourStory, impact, brand } = siteContent

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="text-center mb-20">
                <p className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">
                    {brand.tagline}
                </p>
                <h1 className="text-4xl font-bold text-brand-black md:text-5xl lg:text-6xl mb-6">
                    {ourStory.hero.headline}
                </h1>
                <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                    {ourStory.hero.subheadline}
                </p>
            </section>

            {/* Mission Statement */}
            <section className="mb-20">
                <div className="max-w-4xl mx-auto rounded-3xl bg-brand-black p-12 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">
                        {ourStory.mission.title}
                    </p>
                    <p className="text-2xl font-medium text-white leading-relaxed md:text-3xl">
                        {ourStory.mission.content}
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-brand-black mb-8">
                        {ourStory.about.title}
                    </h2>
                    <div className="space-y-6">
                        {ourStory.about.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-lg text-brand-dark leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="mb-20 rounded-3xl bg-brand-light/50 py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                            Making a Difference
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-brand-black">
                            {impact.title}
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {impact.metrics.map((metric, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-brand-white">
                                <p className="text-4xl font-bold text-brand-black">{metric.value}</p>
                                <p className="mt-2 text-sm font-semibold text-brand-accent uppercase tracking-wider">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KVTC Section */}
            <section className="mb-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-brand-black mb-8">
                        {ourStory.kvtc.title}
                    </h2>
                    <p className="text-lg text-brand-dark leading-relaxed">
                        {ourStory.kvtc.content}
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="mb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-brand-black">
                            {ourStory.values.title}
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {ourStory.values.items.map((value, index) => {
                            const icons = [FiHeart, FiAward, FiGlobe, FiUsers]
                            const Icon = icons[index % icons.length]
                            return (
                                <div key={index} className="text-center p-8 rounded-2xl border border-brand-light">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
                                        <Icon className="h-6 w-6 text-brand-accent" />
                                    </div>
                                    <h3 className="text-lg font-bold text-brand-black mb-2">{value.title}</h3>
                                    <p className="text-sm text-brand-gray leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center">
                <div className="max-w-2xl mx-auto rounded-3xl bg-brand-accent/10 p-12">
                    <h2 className="text-2xl font-bold text-brand-black mb-4">
                        Join Our Mission
                    </h2>
                    <p className="text-brand-dark mb-8">
                        Every purchase and donation directly supports differently-abled artisans.
                        Together, we can create more opportunities.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center rounded-full bg-brand-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark"
                        >
                            Shop Collection
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OurStoryPage
