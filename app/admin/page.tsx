import AdminPanel from '@/components/AdminPanel';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#c5653b', textDecoration: 'none', fontWeight: 'bold' }}>
          &larr; Back to Homepage
        </Link>
        <h1 style={{ marginTop: '1rem', fontSize: '2.5rem' }}>Content Management</h1>
        <p style={{ color: '#666' }}>Edit the new product launch banner below.</p>
      </div>
      <AdminPanel />
    </div>
  );
}
