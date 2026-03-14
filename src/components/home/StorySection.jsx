import React from 'react'
import { siteContent } from '../../data/content'

const StorySection = () => {
    const { story } = siteContent

    return (
        <section className="py-20">
            <div className="mx-auto max-w-3xl text-center">
                {/* Section Header */}
                <p className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                    Our Purpose
                </p>
                <h2 className="mt-4 text-3xl font-bold text-brand-black md:text-4xl">
                    {story.title}
                </h2>
                <p className="mt-2 text-lg text-brand-gray">
                    {story.subtitle}
                </p>

                {/* Story Paragraphs */}
                <div className="mt-10 space-y-6 text-left">
                    {story.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-lg leading-relaxed text-brand-dark"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StorySection
