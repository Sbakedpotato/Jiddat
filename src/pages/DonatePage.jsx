import React, { useState } from 'react'
import { FiHeart, FiCheck } from 'react-icons/fi'
import { siteContent } from '../data/content'

const DonatePage = () => {
    const { donate, brand } = siteContent
    const [selectedAmount, setSelectedAmount] = useState(null)
    const [customAmount, setCustomAmount] = useState('')
    const [donorName, setDonorName] = useState('')
    const [donorEmail, setDonorEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const effectiveAmount = selectedAmount || (customAmount ? parseInt(customAmount, 10) : 0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!effectiveAmount || effectiveAmount < 100) {
            alert('Please select or enter a donation amount (minimum Rs. 100)')
            return
        }

        setLoading(true)

        // TODO: Integrate with payment provider (e.g., Stripe, JazzCash, EasyPaisa)
        // For now, we'll simulate a successful donation
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In production, this would call:
            // await api.createDonation({ amount: effectiveAmount, donorName, donorEmail, message })

            setSubmitted(true)
        } catch (err) {
            alert('Unable to process donation. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="max-w-md text-center">
                    {/* Success Icon */}
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand-success/10">
                        <FiCheck className="h-10 w-10 text-brand-success" />
                    </div>

                    {/* Thank You Message */}
                    <h1 className="text-3xl font-bold text-brand-black mb-4">
                        {donate.thankYou.headline}
                    </h1>
                    <p className="text-brand-gray leading-relaxed mb-8">
                        {donate.thankYou.message}
                    </p>

                    {/* Amount */}
                    <div className="inline-block rounded-full bg-brand-light px-6 py-3 mb-8">
                        <span className="text-lg font-bold text-brand-black">
                            Rs. {effectiveAmount.toLocaleString()}
                        </span>
                    </div>

                    {/* Share */}
                    <div className="space-y-4">
                        <p className="text-sm text-brand-gray">Share your support</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    const text = `I just donated to ${brand.fullName} to support differently-abled artisans! Join me in making a difference.`
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
                                }}
                                className="rounded-full bg-brand-black px-6 py-2 text-sm font-medium text-white hover:bg-brand-dark transition-colors"
                            >
                                Share on Twitter
                            </button>
                            <button
                                onClick={() => {
                                    const text = `I just donated to ${brand.fullName} to support differently-abled artisans!`
                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                                }}
                                className="rounded-full border border-brand-light px-6 py-2 text-sm font-medium text-brand-black hover:bg-brand-light transition-colors"
                            >
                                Share on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                    <FiHeart className="text-brand-accent" />
                    <span className="text-sm font-bold uppercase tracking-widest text-brand-accent">
                        Support Our Mission
                    </span>
                </div>
                <h1 className="text-4xl font-bold text-brand-black mb-4">
                    {donate.headline}
                </h1>
                <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
                    {donate.description}
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Donation Form */}
                <div className="order-2 lg:order-1">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Preset Amounts */}
                        <div>
                            <label className="block text-sm font-semibold text-brand-black mb-4">
                                Select Amount
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {donate.presetAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                                        className={`rounded-xl py-4 text-center font-bold transition-all ${selectedAmount === amount
                                                ? 'bg-brand-black text-white'
                                                : 'bg-brand-light text-brand-black hover:bg-brand-light/80'
                                            }`}
                                    >
                                        Rs. {amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-brand-black mb-2">
                                Or enter custom amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-medium">
                                    Rs.
                                </span>
                                <input
                                    type="number"
                                    min="100"
                                    value={customAmount}
                                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                    placeholder="Enter amount"
                                    className="w-full rounded-xl border border-brand-light bg-white py-4 pl-12 pr-4 text-brand-black placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                />
                            </div>
                        </div>

                        {/* Donor Info (Optional) */}
                        <div className="space-y-4">
                            <p className="text-sm text-brand-gray">Optional: Leave your details</p>
                            <input
                                type="text"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                placeholder="Your name"
                                className="w-full rounded-xl border border-brand-light bg-white py-3 px-4 text-brand-black placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                            />
                            <input
                                type="email"
                                value={donorEmail}
                                onChange={(e) => setDonorEmail(e.target.value)}
                                placeholder="Your email"
                                className="w-full rounded-xl border border-brand-light bg-white py-3 px-4 text-brand-black placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Leave a message (optional)"
                                rows={3}
                                className="w-full rounded-xl border border-brand-light bg-white py-3 px-4 text-brand-black placeholder:text-brand-muted focus:border-brand-accent focus:outline-none resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !effectiveAmount}
                            className="w-full rounded-full bg-brand-accent py-4 font-bold text-white transition-all hover:bg-brand-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : `Donate Rs. ${effectiveAmount ? effectiveAmount.toLocaleString() : '0'}`}
                        </button>

                        <p className="text-xs text-center text-brand-muted">
                            Your donation is secure. We do not store payment information.
                        </p>
                    </form>
                </div>

                {/* Impact Info */}
                <div className="order-1 lg:order-2">
                    <div className="rounded-3xl bg-brand-light/50 p-8">
                        <h3 className="text-xl font-bold text-brand-black mb-6">
                            What Your Donation Funds
                        </h3>
                        <div className="space-y-4">
                            {donate.whatYourDonationFunds.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 rounded-xl bg-brand-white p-4"
                                >
                                    <div className="flex-shrink-0 rounded-full bg-brand-accent/10 px-3 py-1">
                                        <span className="text-sm font-bold text-brand-accent">{item.amount}</span>
                                    </div>
                                    <p className="text-sm text-brand-dark leading-relaxed">{item.impact}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 pt-8 border-t border-brand-light/50">
                            <p className="text-xs text-brand-gray mb-4 uppercase tracking-wider font-semibold">
                                100% goes to our mission
                            </p>
                            <p className="text-sm text-brand-dark leading-relaxed">
                                Every rupee you donate directly supports artisan training, materials, equipment, and fair wages.
                                Administrative costs are covered by our partner organizations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonatePage
