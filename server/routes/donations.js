import express from 'express'
import { query } from '../config/db.js'

const router = express.Router()

/**
 * POST /api/donations
 * Create a new donation record
 * 
 * TODO: Integrate with payment provider (JazzCash, EasyPaisa, Stripe, etc.)
 * Currently this creates a pending donation record. In production:
 * 1. Initialize payment with provider
 * 2. Create donation record with 'pending' status
 * 3. On payment callback/webhook, update status to 'completed'
 */
router.post('/', async (req, res) => {
    const { amount, donorName, donorEmail, message } = req.body || {}

    if (!amount || amount < 100) {
        return res.status(400).json({ message: 'Donation amount must be at least Rs. 100' })
    }

    try {
        const [result] = await query(
            `INSERT INTO donations (amount, donor_name, donor_email, message, status) 
       VALUES (?, ?, ?, ?, 'pending')`,
            [amount, donorName || null, donorEmail || null, message || null]
        )

        const donationId = result.insertId

        // TODO: Initialize payment with provider here
        // const paymentUrl = await paymentProvider.createPayment({
        //   amount,
        //   reference: `JIDDAT-${donationId}`,
        //   returnUrl: `${process.env.CLIENT_ORIGIN}/donate/success/${donationId}`,
        // })

        // For now, simulate immediate success
        await query('UPDATE donations SET status = ? WHERE id = ?', ['completed', donationId])

        res.status(201).json({
            id: donationId,
            amount,
            status: 'completed',
            message: 'Thank you for your donation!',
        })
    } catch (error) {
        console.error('Donation error:', error)
        res.status(500).json({ message: 'Unable to process donation' })
    }
})

/**
 * GET /api/donations/:id
 * Get donation status (for thank-you page)
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const [rows] = await query(
            `SELECT id, amount, status, created_at AS createdAt FROM donations WHERE id = ?`,
            [id]
        )

        if (!rows.length) {
            return res.status(404).json({ message: 'Donation not found' })
        }

        res.json(rows[0])
    } catch (error) {
        console.error('Donation lookup error:', error)
        res.status(500).json({ message: 'Unable to retrieve donation' })
    }
})

export default router
