import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div className="animate-fade-in" style={{
          fontSize: '8rem',
          fontWeight: '800',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem',
        }}>
          404
        </div>
        
        <h1 className="animate-fade-in-up" style={{
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          animationDelay: '0.2s',
        }}>
          Страница не найдена
        </h1>
        
        <p className="animate-fade-in-up" style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          lineHeight: 1.6,
          animationDelay: '0.4s',
        }}>
          Запрашиваемая страница не существует, была перемещена или удалена. 
          Возможно, вы перешли по устаревшей ссылке.
        </p>
        
        <div className="animate-fade-in-up" style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animationDelay: '0.6s',
        }}>
          <Link to="/" className="btn-primary" style={{
            textDecoration: 'none',
            padding: '0.875rem 2rem',
          }}>
            На главную
          </Link>
          <Link to="/security" style={{
            padding: '0.875rem 2rem',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '2px solid var(--border-color)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}>
            Наши услуги
          </Link>
        </div>
        
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          textAlign: 'left',
        }}>
          <h3 style={{
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            fontSize: '1.125rem',
          }}>
            Популярные разделы:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.5rem',
          }}>
            <li><Link to="/security" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>️ Информационная безопасность</Link></li>
            <li><Link to="/automation" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>⚙️ Автоматизация бизнеса</Link></li>
            <li><Link to="/audit" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>📊 Финансовый аудит</Link></li>
            <li><Link to="/gov" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>🏛️ Госструктуры</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;