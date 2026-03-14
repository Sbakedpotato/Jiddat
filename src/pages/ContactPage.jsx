import React, { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiClock, FiCheck } from 'react-icons/fi'
import { siteContent } from '../data/content'

const ContactPage = () => {
  const { contact: contactContent } = siteContent
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    // TODO: Integrate with email service (e.g., Nodemailer, SendGrid)
    // For now, simulate a successful submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      alert('Unable to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-success/10">
            <FiCheck className="h-8 w-8 text-brand-success" />
          </div>
          <h1 className="text-2xl font-bold text-brand-black mb-4">Message Sent!</h1>
          <p className="text-brand-gray">{contactContent.form.successMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-black mb-4">
          {contactContent.headline}
        </h1>
        <p className="text-lg text-brand-gray max-w-xl mx-auto">
          {contactContent.description}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={contactContent.form.namePlaceholder}
                className={`w-full rounded-xl border bg-white py-4 px-5 text-brand-black placeholder:text-brand-muted focus:outline-none focus:ring-2 transition-colors ${errors.name
                    ? 'border-brand-error focus:ring-brand-error/20'
                    : 'border-brand-light focus:border-brand-accent focus:ring-brand-accent/20'
                  }`}
              />
              {errors.name && <p className="mt-1 text-sm text-brand-error">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={contactContent.form.emailPlaceholder}
                className={`w-full rounded-xl border bg-white py-4 px-5 text-brand-black placeholder:text-brand-muted focus:outline-none focus:ring-2 transition-colors ${errors.email
                    ? 'border-brand-error focus:ring-brand-error/20'
                    : 'border-brand-light focus:border-brand-accent focus:ring-brand-accent/20'
                  }`}
              />
              {errors.email && <p className="mt-1 text-sm text-brand-error">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={contactContent.form.subjectPlaceholder}
                className={`w-full rounded-xl border bg-white py-4 px-5 text-brand-black placeholder:text-brand-muted focus:outline-none focus:ring-2 transition-colors ${errors.subject
                    ? 'border-brand-error focus:ring-brand-error/20'
                    : 'border-brand-light focus:border-brand-accent focus:ring-brand-accent/20'
                  }`}
              />
              {errors.subject && <p className="mt-1 text-sm text-brand-error">{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={contactContent.form.messagePlaceholder}
                rows={5}
                className={`w-full rounded-xl border bg-white py-4 px-5 text-brand-black placeholder:text-brand-muted focus:outline-none focus:ring-2 transition-colors resize-none ${errors.message
                    ? 'border-brand-error focus:ring-brand-error/20'
                    : 'border-brand-light focus:border-brand-accent focus:ring-brand-accent/20'
                  }`}
              />
              {errors.message && <p className="mt-1 text-sm text-brand-error">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-black py-4 font-bold text-white transition-all hover:bg-brand-dark disabled:opacity-50"
            >
              {loading ? 'Sending...' : contactContent.form.submitButton}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-brand-light/50 p-8">
            <h2 className="text-xl font-bold text-brand-black mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-white">
                  <FiMail className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">Email</p>
                  <a href={`mailto:${contactContent.email}`} className="text-brand-gray hover:text-brand-accent transition-colors">
                    {contactContent.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-white">
                  <FiPhone className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">Phone</p>
                  <a href={`tel:${contactContent.phone.replace(/\s/g, '')}`} className="text-brand-gray hover:text-brand-accent transition-colors">
                    {contactContent.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-white">
                  <FiMapPin className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">Address</p>
                  <p className="text-brand-gray">{contactContent.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-white">
                  <FiClock className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">Hours</p>
                  <p className="text-brand-gray">{contactContent.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-2xl bg-brand-light/30 h-48 flex items-center justify-center">
            <p className="text-sm text-brand-muted">Map embed placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
