'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsSearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(query.trim())}&type=news`;
      router.push(searchUrl);
    }
  };

  return (
    <div className="search-area">
      <h3>Search</h3>
      <div className="space24" />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search news..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </form>
    </div>
  );
}
