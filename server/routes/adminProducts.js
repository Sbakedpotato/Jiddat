import express from 'express'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'
import { randomUUID } from 'crypto'

const router = express.Router()

router.use(authenticate, requireAdmin)

// List products
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query
        const offset = (page - 1) * limit

        let baseSql = `FROM products p 
                   LEFT JOIN categories c ON p.category_id = c.id`
        const params = []
        const conditions = []

        if (search) {
            conditions.push('(p.title LIKE ? OR p.description LIKE ?)')
            params.push(`%${search}%`, `%${search}%`)
        }

        if (conditions.length) {
            baseSql += ' WHERE ' + conditions.join(' AND ')
        }

        // Count
        const [countRows] = await query(`SELECT COUNT(*) as total ${baseSql}`, params)
        const total = countRows[0].total

        // Fetch
        const [rows] = await query(`
      SELECT p.*, c.name as category_name
      ${baseSql}
      ORDER BY p.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `, params)

        // Parse JSON fields
        const products = rows.map(p => ({
            ...p,
            sizes: safeParse(p.sizes, []),
            colors: safeParse(p.colors, []),
            images: safeParse(p.images, []),
        }))

        res.json({
            products,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error('List products error:', error)
        res.status(500).json({ message: 'Failed to list products' })
    }
})

const safeParse = (value, fallback) => {
    if (!value) return fallback
    if (typeof value === 'object') return value
    try {
        return JSON.parse(value)
    } catch {
        return fallback
    }
}

// Create product
router.post('/', async (req, res) => {
    try {
        const {
            title, description, price, category_id, image_url, images,
            inventory_status, sizes, colors, material, care_instructions, fit, sku, maker_story
        } = req.body

        if (!title || !price || !category_id) {
            return res.status(400).json({ message: 'Title, price, and category are required' })
        }

        const id = `jd-${randomUUID().slice(0, 8)}`

        await query(`
      INSERT INTO products (id, title, description, price, category_id, image_url, images,
        inventory_status, sizes, colors, material, care_instructions, fit, sku, maker_story)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            id, title, description, price, category_id, image_url,
            JSON.stringify(images || []),
            inventory_status || 'In Stock',
            JSON.stringify(sizes || []),
            JSON.stringify(colors || []),
            material || null,
            care_instructions || null,
            fit || null,
            sku || null,
            maker_story || null
        ])

        res.status(201).json({ message: 'Product created', id })
    } catch (error) {
        console.error('Create product error:', error)
        res.status(500).json({ message: 'Failed to create product' })
    }
})

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        // Check if product is in any orders
        const [orderItems] = await query('SELECT id FROM order_items WHERE product_id = ? LIMIT 1', [id])
        if (orderItems.length > 0) {
            return res.status(400).json({
                message: 'Cannot delete product because it is part of existing orders. Consider archiving it instead.'
            })
        }

        // Delete from related tables
        await query('DELETE FROM recommendation_items WHERE product_id = ?', [id])
        await query('DELETE FROM wishlists WHERE product_id = ?', [id])

        // Delete the product
        const [result] = await query('DELETE FROM products WHERE id = ?', [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Delete product error:', error)
        res.status(500).json({ message: 'Failed to delete product' })
    }
})

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await query('SELECT * FROM products WHERE id = ?', [id])
        if (!rows.length) return res.status(404).json({ message: 'Product not found' })

        const product = rows[0]
        // Parse JSON fields
        product.sizes = safeParse(product.sizes, [])
        product.colors = safeParse(product.colors, [])
        product.images = safeParse(product.images, [])

        res.json(product)
    } catch (error) {
        console.error('Get product error:', error)
        res.status(500).json({ message: 'Failed to fetch product' })
    }
})

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {
            title, description, price, category_id, image_url, images,
            inventory_status, sizes, colors, material, care_instructions, fit, sku, maker_story
        } = req.body

        if (!title || !price || !category_id) {
            return res.status(400).json({ message: 'Title, price, and category are required' })
        }

        await query(`
      UPDATE products 
      SET title = ?, description = ?, price = ?, category_id = ?, 
          image_url = ?, images = ?, inventory_status = ?,
          sizes = ?, colors = ?, material = ?, care_instructions = ?,
          fit = ?, sku = ?, maker_story = ?
      WHERE id = ?
    `, [
            title, description, price, category_id, image_url,
            JSON.stringify(images || []),
            inventory_status,
            JSON.stringify(sizes || []),
            JSON.stringify(colors || []),
            material || null,
            care_instructions || null,
            fit || null,
            sku || null,
            maker_story || null,
            id
        ])

        res.json({ message: 'Product updated' })
    } catch (error) {
        console.error('Update product error:', error)
        res.status(500).json({ message: 'Failed to update product' })
    }
})

export default router
