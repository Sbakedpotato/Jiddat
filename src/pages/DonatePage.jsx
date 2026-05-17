import React, { useState, useRef } from 'react'
import { FiHeart, FiCheck, FiUpload, FiX, FiCopy, FiSmartphone, FiCreditCard } from 'react-icons/fi'
import { siteContent } from '../data/content'

const PAYMENT_METHODS = [
    {
        id: 'easypaisa',
        label: 'EasyPaisa',
        icon: FiSmartphone,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        activeBorder: 'border-green-500',
        activeBg: 'bg-green-50',
        fields: [
            { label: 'Account Title', value: 'Hunar Foundation' },
            { label: 'Mobile Account', value: '0300-1234567' },
            { label: 'CNIC', value: '42101-1234567-8' },
        ],
        instruction: 'Open EasyPaisa → Send Money → Mobile Account → Enter the number above.',
    },
    {
        id: 'hbl',
        label: 'HBL Bank Transfer',
        icon: FiCreditCard,
        color: 'text-blue-700',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        activeBorder: 'border-blue-600',
        activeBg: 'bg-blue-50',
        fields: [
            { label: 'Account Title', value: 'Hunar Foundation Pvt. Ltd.' },
            { label: 'Account No.', value: '1234-5678-9012-3456' },
            { label: 'IBAN', value: 'PK36HABB0000001234567890' },
            { label: 'Branch Code', value: '0026 – Karachi Main' },
        ],
        instruction: 'Use HBL Mobile / Internet Banking or visit any HBL branch to transfer funds.',
    },
]

const CopyField = ({ label, value }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between rounded-lg bg-white border border-brand-light px-4 py-3">
            <div>
                <p className="text-xs text-brand-muted uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-brand-black font-mono">{value}</p>
            </div>
            <button
                type="button"
                onClick={handleCopy}
                className="ml-3 flex-shrink-0 text-brand-gray hover:text-brand-accent transition-colors"
                title="Copy"
            >
                {copied ? <FiCheck className="h-4 w-4 text-brand-success" /> : <FiCopy className="h-4 w-4" />}
            </button>
        </div>
    )
}

const DonatePage = () => {
    const { donate, brand } = siteContent
    const [selectedAmount, setSelectedAmount] = useState(null)
    const [customAmount, setCustomAmount] = useState('')
    const [donorName, setDonorName] = useState('')
    const [donorEmail, setDonorEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState('easypaisa')
    const [transactionImage, setTransactionImage] = useState(null)   // { file, preview }
    const [imageError, setImageError] = useState('')
    const fileInputRef = useRef(null)

    const effectiveAmount = selectedAmount || (customAmount ? parseInt(customAmount, 10) : 0)
    const activeMethod = PAYMENT_METHODS.find(m => m.id === selectedPayment)

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setImageError('Please upload an image file (JPG, PNG, etc.)')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image must be smaller than 5 MB')
            return
        }

        setImageError('')
        const preview = URL.createObjectURL(file)
        setTransactionImage({ file, preview })
    }

    const removeImage = () => {
        if (transactionImage?.preview) URL.revokeObjectURL(transactionImage.preview)
        setTransactionImage(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!effectiveAmount || effectiveAmount < 100) {
            alert('Please select or enter a donation amount (minimum Rs. 100)')
            return
        }
        if (!transactionImage) {
            setImageError('Please upload a screenshot of your transaction to confirm your donation.')
            // Scroll to the upload area
            fileInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }

        setLoading(true)

        try {
            // Simulated API call — image is NOT sent to the backend
            await new Promise(resolve => setTimeout(resolve, 1500))
            // In production:
            // await api.createDonation({ amount: effectiveAmount, donorName, donorEmail, message, paymentMethod: selectedPayment })
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
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand-success/10">
                        <FiCheck className="h-10 w-10 text-brand-success" />
                    </div>
                    <h1 className="text-3xl font-bold text-brand-black mb-4">
                        {donate.thankYou.headline}
                    </h1>
                    <p className="text-brand-gray leading-relaxed mb-8">
                        {donate.thankYou.message}
                    </p>
                    <div className="inline-block rounded-full bg-brand-light px-6 py-3 mb-8">
                        <span className="text-lg font-bold text-brand-black">
                            Rs. {effectiveAmount.toLocaleString()}
                        </span>
                    </div>
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
                                        onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
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
                                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                                    placeholder="Enter amount"
                                    className="w-full rounded-xl border border-brand-light bg-white py-4 pl-12 pr-4 text-brand-black placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                />
                            </div>
                        </div>

                        {/* ── Payment Method ── */}
                        <div>
                            <label className="block text-sm font-semibold text-brand-black mb-4">
                                Payment Method
                            </label>
                            <div className="flex gap-3 mb-5">
                                {PAYMENT_METHODS.map((method) => {
                                    const Icon = method.icon
                                    const active = selectedPayment === method.id
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 px-4 font-semibold text-sm transition-all ${active
                                                ? `${method.activeBorder} ${method.activeBg} ${method.color}`
                                                : 'border-brand-light bg-white text-brand-gray hover:border-brand-accent/40'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {method.label}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Account Details Card */}
                            {activeMethod && (
                                <div className={`rounded-2xl border ${activeMethod.border} ${activeMethod.bg} p-5 space-y-3`}>
                                    <p className={`text-xs font-bold uppercase tracking-wider ${activeMethod.color} mb-1`}>
                                        {activeMethod.label} Account Details
                                    </p>
                                    {activeMethod.fields.map(f => (
                                        <CopyField key={f.label} label={f.label} value={f.value} />
                                    ))}
                                    <p className="text-xs text-brand-gray pt-1 leading-relaxed">
                                        <span className="font-semibold">How to pay: </span>
                                        {activeMethod.instruction}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ── Transaction Screenshot Upload (mandatory) ── */}
                        <div>
                            <label className="block text-sm font-semibold text-brand-black mb-1">
                                Upload Transaction Screenshot
                                <span className="ml-1 text-brand-accent">*</span>
                            </label>
                            <p className="text-xs text-brand-muted mb-3">
                                Required to confirm your donation. Accepted: JPG, PNG, WEBP (max 5 MB).
                            </p>

                            {!transactionImage ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`w-full rounded-2xl border-2 border-dashed py-10 flex flex-col items-center gap-3 transition-colors ${imageError
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-brand-light bg-brand-light/30 hover:border-brand-accent hover:bg-brand-accent/5'
                                        }`}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                        <FiUpload className="h-5 w-5 text-brand-accent" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-brand-black">Click to upload screenshot</p>
                                        <p className="text-xs text-brand-muted mt-0.5">or drag and drop</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden border border-brand-light">
                                    <img
                                        src={transactionImage.preview}
                                        alt="Transaction screenshot"
                                        className="w-full max-h-56 object-contain bg-brand-light/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <FiX className="h-4 w-4" />
                                    </button>
                                    <div className="px-4 py-2 bg-white flex items-center gap-2">
                                        <FiCheck className="h-4 w-4 text-brand-success flex-shrink-0" />
                                        <p className="text-xs text-brand-dark truncate">{transactionImage.file.name}</p>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            {imageError && (
                                <p className="mt-2 text-xs text-red-500">{imageError}</p>
                            )}
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
                            {loading ? 'Processing...' : `Confirm Donation of Rs. ${effectiveAmount ? effectiveAmount.toLocaleString() : '0'}`}
                        </button>

                        <p className="text-xs text-center text-brand-muted">
                            Your donation is secure. Transaction screenshots are used for verification only and are not stored.
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