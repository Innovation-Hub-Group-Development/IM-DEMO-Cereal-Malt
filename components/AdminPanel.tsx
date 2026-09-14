"use client";

import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    isActive: false,
    title: '',
    description: '',
    link: '',
    linkText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/banner')
      .then(res => res.json())
      .then(data => {
        setFormData({
          isActive: data.isActive || false,
          title: data.title || '',
          description: data.description || '',
          link: data.link || '',
          linkText: data.linkText || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('Banner updated successfully!');
      } else {
        setMessage('Failed to update banner.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating banner.');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Banner CMS</h2>
      
      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', background: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            style={{ width: '20px', height: '20px' }}
          />
          Banner is Active (Visible on homepage)
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="title" style={{ fontWeight: 'bold' }}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="link" style={{ fontWeight: 'bold' }}>Link URL</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="/products/golden-malt"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="linkText" style={{ fontWeight: 'bold' }}>Link Text</label>
          <input
            type="text"
            id="linkText"
            name="linkText"
            value={formData.linkText}
            onChange={handleChange}
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Learn More"
          />
        </div>

        <button 
          type="submit" 
          disabled={saving}
          style={{ padding: '1rem', background: '#c5653b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
