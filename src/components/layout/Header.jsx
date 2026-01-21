import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import SearchBar from './SearchBar'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { siteContent } from '../../data/content'

const Header = () => {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const navLinks = siteContent.navigation.main

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-white/95 backdrop-blur-md border-b border-brand-light/50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-brand-black">
            {siteContent.brand.name}
          </span>
          <span className="text-xs font-medium text-brand-accent tracking-wider">
            {siteContent.brand.tagline}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden w-64 overflow-hidden lg:block">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/account" className="text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors">
                {user.name?.split(' ')[0] || 'Account'}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-brand-gray hover:text-brand-black transition-colors"
              >
                (Logout)
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors">
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="text-brand-dark transition-colors hover:text-brand-accent p-2"
            aria-label="Wishlist"
          >
            <FiHeart size={20} />
          </button>

          <Link
            to="/cart"
            className="relative text-brand-dark transition-colors hover:text-brand-accent p-2"
            aria-label="Cart"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-brand-dark p-2"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-light bg-brand-white">
          <div className="px-6 py-4">
            <SearchBar />
          </div>
          <nav className="px-6 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent transition-colors"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="block py-2 text-base font-medium text-brand-gray hover:text-brand-black transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
