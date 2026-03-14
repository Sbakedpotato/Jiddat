import React from 'react'
import { Link } from 'react-router-dom'
import { siteContent } from '../../data/content'

const Footer = () => {
  const { footer, brand, contact } = siteContent
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-brand-light bg-brand-white text-brand-gray">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <h4 className="text-2xl font-bold text-brand-black">
                {brand.name}
                <span className="ml-2 text-sm font-medium text-brand-accent">{brand.tagline}</span>
              </h4>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              {footer.tagline}
            </p>
            <div className="pt-4 space-y-2 text-sm">
              <p className="text-brand-dark font-medium">{contact.email}</p>
              <p>{contact.phone}</p>
              <p className="text-xs">{contact.hours}</p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">
              {footer.sections.shop.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {footer.sections.shop.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">
              {footer.sections.about.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {footer.sections.about.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">
              {footer.sections.support.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {footer.sections.support.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">
              {footer.sections.legal.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {footer.sections.legal.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-light">
        <div className="mx-auto max-w-[1400px] px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-gray">
            {footer.copyright.replace('{year}', currentYear)}
          </p>
          <p className="text-xs text-brand-muted">
            Empowering artisans, one stitch at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
