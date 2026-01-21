import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    navigate(`/shop?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-full border border-slate-300 bg-white shadow-sm overflow-hidden"
    >
      <input
        type="search"
        className="w-full min-w-0 border-none px-4 py-2 text-sm focus:outline-none"
        placeholder="Search..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />

      <button
        type="submit"
        className="flex-shrink-0 flex items-center rounded-full bg-brand-black px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark transition m-1"
      >
        <FiSearch size={14} />
      </button>
    </form>
  )
}

export default SearchBar
