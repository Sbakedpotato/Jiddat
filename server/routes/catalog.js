import express from 'express'
import { query } from '../config/db.js'

const router = express.Router()

const safeParse = (value, fallback) => {
  if (!value) return fallback
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

router.get('/hero-banners', async (req, res) => {
  const [rows] = await query(
    'SELECT id, title, subtitle, link, cta, image_url AS imageUrl, background FROM hero_banners ORDER BY created_at DESC'
  )
  res.json(rows)
})

router.get('/categories', async (req, res) => {
  const [rows] = await query('SELECT id, name, image_url AS image FROM categories ORDER BY name ASC')
  res.json(rows)
})

router.get('/recommendations', async (req, res) => {
  const [sections] = await query('SELECT id, title FROM recommendation_sections')
  const [items] = await query(
    `SELECT ri.section_id AS sectionId,
            ri.product_id AS productId,
            ri.position,
            p.id AS id,
            p.title,
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
            p.maker_story AS makerStory
     FROM recommendation_items ri
     JOIN products p ON p.id = ri.product_id
     ORDER BY ri.section_id, ri.position ASC`
  )

  const grouped = sections.map((section) => ({
    ...section,
    products: items
      .filter((item) => item.sectionId === section.id)
      .map((item) => ({
        ...item,
        sizes: safeParse(item.sizes, []),
        colors: safeParse(item.colors, []),
      })),
  }))

  res.json(grouped)
})

router.get('/notification', async (req, res) => {
  const [rows] = await query(
    'SELECT content_value AS message FROM site_content WHERE content_key = ? LIMIT 1',
    ['notification']
  )
  res.json({ message: rows[0]?.message || '' })
})

export default router
