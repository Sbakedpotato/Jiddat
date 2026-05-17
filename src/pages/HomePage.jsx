import React from 'react'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import Skeleton from '../components/common/Skeleton'
import HeroSection from '../components/home/HeroSection'
import StorySection from '../components/home/StorySection'
import HowItWorks from '../components/home/HowItWorks'
import FeaturedProducts from '../components/home/FeaturedProducts'
import ImpactMetrics from '../components/home/ImpactMetrics'
import CTABlocks from '../components/home/CTABlocks'
import CategoryShortcuts from '../components/home/CategoryShortcuts'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, recData] = await Promise.all([
          api.getCategoryShortcuts(),
          api.getRecommendations(),
        ])
        setCategories(categoryData)
        // Get products from first recommendation section (featured)
        const featured = recData?.[0]?.products || []
        setFeaturedProducts(featured)
      } catch (err) {
        setError('Unable to load storefront data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-12">
        <Skeleton className="h-[400px] rounded-3xl" />
        <div className="space-y-4 max-w-2xl mx-auto">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="rounded-2xl border border-brand-light bg-white p-4">
              <Skeleton className="mb-3 h-48 rounded-2xl" />
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-brand-gray">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section - Mission Statement */}
      <HeroSection />

      {/* The Story Section */}
      <StorySection />

      {/* How It Works - Train, Create, Earn */}
      <HowItWorks />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Shop by Category */}
      <CategoryShortcuts categories={categories} />

      <CTABlocks />
    </div>
  )
}

export default HomePage
