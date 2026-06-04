import React, { useState } from 'react';
import api from '../services/api';

interface LeadFormProps {
  serviceSlug?: string;
  tariffId?: number;
  onSuccess?: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ serviceSlug, tariffId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Проверяем, есть ли токен
    const token = localStorage.getItem('access_token');
    console.log('Token:', token ? 'Есть' : 'Нет');
    console.log('Отправляемые данные:', {
      ...formData,
      service: serviceSlug || null,
    });

    try {
      const response = await api.post('leads/', {
        ...formData,
        service: serviceSlug || null,
      });
      
      console.log('Ответ сервера:', response.data);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err: any) {
      console.error('Ошибка отправки заявки:', err);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.detail 
        || err.response?.data?.non_field_errors?.[0]
        || JSON.stringify(err.response?.data)
        || 'Ошибка отправки заявки';
        
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Заявка отправлена!
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          padding: '0.75rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
        }}>
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Ваше имя *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
      />

      <input
        type="email"
        placeholder="Email *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
      />

      <input
        type="tel"
        placeholder="Телефон"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
      />

      <input
        type="text"
        placeholder="Компания"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
      />

      <textarea
        placeholder="Сообщение (опционально)"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={4}
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          resize: 'vertical',
          fontFamily: 'inherit',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{
          width: '100%',
          padding: '1rem',
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
};

export default LeadForm;