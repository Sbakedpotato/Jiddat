import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteContent } from '../../data/content'

const NotificationBar = () => {
  const { notificationBar } = siteContent
  const [visible, setVisible] = useState(true)

  if (!visible || !notificationBar?.message) return null

  return (
    <div className="relative bg-brand-black px-4 py-2.5 text-center">
      <Link
        to={notificationBar.link || '/our-story'}
        className="text-xs font-medium tracking-wide text-white hover:text-brand-accent transition-colors"
      >
        {notificationBar.message}
      </Link>
    </div>
  )
}

export default NotificationBar
