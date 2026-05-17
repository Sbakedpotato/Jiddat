/**
 * Jiddat Site Content Configuration
 * 
 * This file contains all editable site content.
 * Update values here to change text throughout the site.
 */

export const siteContent = {
    // Brand Identity
    brand: {
        name: 'Jiddat',
        tagline: 'by KVTC',
        fullName: 'Jiddat by KVTC',
        mission: 'Empowering differently-abled artisans through fashion.',
    },

    // Hero Section (Home Page)
    hero: {
        headline: 'Fashion with Purpose',
        subheadline: 'Every purchase empowers differently-abled artisans to build skills, earn income, and achieve independence.',
        ctaShop: 'Shop Collection',
        backgroundImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600',
    },

    // The Story Section (Home Page)
    story: {
        title: 'The Jiddat Story',
        subtitle: 'Where purpose meets craftsmanship',
        paragraphs: [
            'Jiddat—meaning "innovation" in Urdu—represents a revolutionary approach to fashion. We believe that beautiful clothing can also create beautiful change in the world.',
            'Our artisans are individuals with special needs who have been trained through KVTC (Karachi Vocational Training Centre). Through months of dedicated skill-building, they master traditional crafts like embroidery, weaving, block printing, and hand-stitching.',
            'When you wear Jiddat, you wear the story of resilience, creativity, and human potential. Each piece is a testament to what becomes possible when we invest in people.',
        ],
    },

    // How It Works Section (Home Page)
    howItWorks: {
        title: 'How It Works',
        subtitle: 'From training to transformation',
        steps: [
            {
                icon: 'train',
                title: 'Train',
                description: 'Differently-abled individuals receive professional skills training through KVTC, learning traditional crafts and modern techniques.',
            },
            {
                icon: 'create',
                title: 'Create',
                description: 'Our artisans handcraft beautiful, high-quality apparel using the skills they\'ve developed, pouring care into every stitch.',
            },
            {
                icon: 'earn',
                title: 'Earn',
                description: 'Your purchase provides fair wages, enabling artisans to achieve financial independence and build dignified lives.',
            },
        ],
    },

    // Impact Metrics Section (Home Page)
    impact: {
        title: 'Our Impact',
        subtitle: 'Together, we\'re making a difference',
        metrics: [
            { value: '150+', label: 'Artisans Trained', description: 'Skilled craftspeople empowered through our program' },
            { value: '5,000+', label: 'Products Crafted', description: 'Handmade pieces created with care and purpose' },
            { value: '₨ 2M+', label: 'Wages Paid', description: 'Fair compensation directly to artisan families' },
            { value: '12', label: 'Craft Disciplines', description: 'Traditional skills preserved and celebrated' },
        ],
    },

    // Featured Products Section (Home Page)
    featuredProducts: {
        title: 'Featured Collection',
        subtitle: 'Handcrafted with purpose',
        ctaText: 'Shop All Products',
        ctaLink: '/shop',
    },

    // CTA Blocks (Home Page)
    ctaBlocks: {
        shop: {
            title: 'Explore Our Collection',
            description: 'Discover beautifully crafted apparel that tells a story of empowerment.',
            buttonText: 'Shop Now',
            link: '/shop',
        },
    },
    // Our Story / About Page
    ourStory: {
        hero: {
            headline: 'Our Story',
            subheadline: 'Fashion that empowers. Made with purpose.',
        },
        mission: {
            title: 'Our Mission',
            content: 'To empower differently-abled individuals through meaningful employment, skill development, and the creation of beautiful, high-quality apparel that celebrates human potential.',
        },
        about: {
            title: 'About Jiddat',
            paragraphs: [
                'Jiddat was born from a simple but powerful belief: that everyone deserves the opportunity to earn a dignified living through meaningful work. Founded in partnership with KVTC (Karachi Vocational Training Centre), we set out to create a brand that would showcase the incredible talents of differently-abled artisans.',
                'Our journey began with a small group of trainees learning traditional embroidery techniques. Today, we work with over 150 artisans skilled in embroidery, weaving, block printing, quilting, crochet, and beadwork. Each person brings their unique perspective and dedication to their craft.',
                'The name "Jiddat" means "innovation" in Urdu—a reflection of our belief that true innovation lies not just in new technologies, but in new ways of thinking about work, worth, and human dignity.',
            ],
        },
        kvtc: {
            title: 'About KVTC',
            content: 'KVTC (Karachi Vocational Training Centre) is a pioneering organization dedicated to providing vocational training and employment opportunities to individuals with special needs. For over two decades, KVTC has been transforming lives through education, skill development, and compassionate support.',
        },
        values: {
            title: 'Our Values',
            items: [
                { title: 'Dignity', description: 'We believe every person deserves meaningful work and fair compensation.' },
                { title: 'Quality', description: 'We never compromise on craftsmanship—our products are made to last.' },
                { title: 'Transparency', description: 'We share the stories behind our products and the impact of each purchase.' },
                { title: 'Community', description: 'We build relationships, not just transactions.' },
            ],
        },
    },

    // Contact Page
    contact: {
        headline: 'Get in Touch',
        subheadline: 'We\'d love to hear from you',
        description: 'Have questions about our products, want to learn more about our mission, or interested in partnerships? Reach out and we\'ll get back to you soon.',
        email: 'hello@jiddat.pk',
        phone: '+92 321 1234567',
        address: 'KVTC Campus, Block 7, Gulshan-e-Iqbal, Karachi, Pakistan',
        hours: 'Monday – Saturday, 9:00 AM – 6:00 PM PKT',
        form: {
            namePlaceholder: 'Your Name',
            emailPlaceholder: 'Your Email',
            subjectPlaceholder: 'Subject',
            messagePlaceholder: 'Your Message',
            submitButton: 'Send Message',
            successMessage: 'Thank you for reaching out! We\'ll get back to you within 24-48 hours.',
        },
    },

    // Product Page
    product: {
        impactModule: {
            title: 'Made with Purpose',
            defaultDescription: 'This product was handcrafted by a differently-abled artisan trained through KVTC. Your purchase directly supports their livelihood and independence.',
            ctaText: 'Learn About Our Impact',
            ctaLink: '/our-story',
        },
        shipping: {
            freeShippingThreshold: 5000,
            freeShippingMessage: 'Free shipping on orders over Rs. 5,000',
            deliveryTime: '3-5 business days',
        },
    },

    // Footer
    footer: {
        tagline: 'Fashion that empowers. Made with purpose.',
        copyright: '© {year} Jiddat by KVTC. All rights reserved.',
        sections: {
            shop: {
                title: 'Shop',
                links: [
                    { label: 'All Products', href: '/shop' },
                    { label: 'Tops', href: '/shop?category=tops' },
                    { label: 'Dresses', href: '/shop?category=dresses' },
                    { label: 'Accessories', href: '/shop?category=accessories' },
                ],
            },
            about: {
                title: 'About',
                links: [
                    { label: 'Our Story', href: '/our-story' },
                    { label: 'Our Impact', href: '/our-story#impact' },
                    { label: 'Contact Us', href: '/contact' },
                ],
            },
            support: {
                title: 'Support',
                links: [
                    { label: 'FAQs', href: '/faqs' },
                    { label: 'Shipping & Returns', href: '/policies#shipping' },
                ],
            },
            legal: {
                title: 'Legal',
                links: [
                    { label: 'Privacy Policy', href: '/policies#privacy' },
                    { label: 'Terms of Service', href: '/policies#terms' },
                ],
            },
        },
    },

    // Navigation
    navigation: {
        main: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Our Story', href: '/our-story' },
            { label: 'Contact', href: '/contact' },
        ],
    },

    // Notification Bar
    notificationBar: {
        message: 'Free shipping on orders over Rs. 5,000 ✨ Every purchase supports artisan livelihoods',
        link: '/our-story',
    },
}
