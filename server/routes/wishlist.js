import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { query } from '../config/db.js'

const router = express.Router()

const safeParse = (value, fallback) => {
  if (!value) return fallback
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const baseSelect = `SELECT
  p.id,
  p.title,
  p.description,
  p.price,
  p.old_price AS oldPrice,
  p.rating,
  p.review_count AS reviewCount,
  p.category_id AS categoryId,
  p.image_url AS image,
  p.inventory_status AS inventoryStatus,
  p.discount,
  p.sizes,
  p.colors,
  p.material,
  p.maker_story AS makerStory,
  c.name AS categoryLabel
FROM wishlists w
JOIN products p ON p.id = w.product_id
LEFT JOIN categories c ON c.id = p.category_id
WHERE w.user_id = ?`

router.get('/', authenticate, async (req, res) => {
  const [rows] = await query(`${baseSelect} ORDER BY w.created_at DESC`, [req.user.id])
  res.json(rows.map(row => ({
    ...row,
    sizes: safeParse(row.sizes, []),
    colors: safeParse(row.colors, []),
  })))
})

router.post('/', authenticate, async (req, res) => {
  const productId = req.body?.productId
  if (!productId) return res.status(400).json({ message: 'productId required' })

  try {
    await query(
      'INSERT IGNORE INTO wishlists (user_id, product_id) VALUES (?, ?)',
      [req.user.id, productId]
    )
    res.status(201).json({ message: 'Added to wishlist' })
  } catch (error) {
    console.error('Wishlist add error:', error)
    res.status(500).json({ message: 'Unable to add to wishlist' })
  }
})

router.delete('/:productId', authenticate, async (req, res) => {
  const { productId } = req.params
  await query('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?', [
    req.user.id,
    productId,
  ])
  res.status(204).send()
})

export default router
