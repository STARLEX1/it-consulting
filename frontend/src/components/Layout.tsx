import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-primary)',
    }}>
      <header style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--gradient-primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}>
                💼
              </div>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.5rem', 
                fontWeight: '800',
              }}>
                IT Consulting
              </span>
            </div>
          </Link>
          
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link 
              to="/" 
              style={{ 
                color: location.pathname === '/' ? 'var(--primary-light)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.color = location.pathname === '/' ? 'var(--primary-light)' : 'var(--text-secondary)'}
            >
              Главная
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  style={{ 
                    color: location.pathname === '/dashboard' ? 'var(--primary-light)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Кабинет
                </Link>
                <button 
                  onClick={logout} 
                  style={{ 
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  style={{
                    textDecoration: 'none',
                    padding: '0.625rem 1.5rem',
                  }}
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

<footer style={{
  background: 'var(--bg-secondary)',
  borderTop: '1px solid var(--border-color)',
  padding: '3rem 2rem 2rem',
  marginTop: 'auto',
}}>
  <div style={{
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '2rem',
  }}>
    {/* Компания */}
    <div>
      <h3 style={{
        color: 'var(--text-primary)',
        fontSize: '1.25rem',
        fontWeight: '700',
        marginBottom: '1rem',
      }}>
        IT Consulting
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Профессиональные IT-решения для развития вашего бизнеса
      </p>
    </div>
    
    {/* Услуги */}
    <div>
      <h4 style={{
        color: 'var(--text-primary)',
        fontWeight: '600',
        marginBottom: '1rem',
      }}>
        Услуги
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li><Link to="/security" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Информационная безопасность</Link></li>
        <li><Link to="/automation" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Автоматизация бизнеса</Link></li>
        <li><Link to="/audit" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Финансовый аудит</Link></li>
        <li><Link to="/gov" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Госструктуры</Link></li>
      </ul>
    </div>
    
    {/* Контакты */}
    <div>
      <h4 style={{
        color: 'var(--text-primary)',
        fontWeight: '600',
        marginBottom: '1rem',
      }}>
        Контакты
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📧</span>
          <a href="mailto:parus-ryazan@mail.ru" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>
            parus-ryazan@mail.ru
          </a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📞</span>
          <a href="tel:+74912958552" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            8 (4912) 95-85-52
          </a>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <span>📍</span>
          <span>390000, г. Рязань, ул. Право-Лыбедская, 40, оф. 11</span>
        </li>
      </ul>
    </div>
  </div>
  
  <div style={{
    maxWidth: '1400px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
    textAlign: 'center',
    color: 'var(--text-muted)',
  }}>
    © Все права защищены. 2026 / Политика Конфиденциальности
  </div>
</footer>
    </div>
  );
};

export default Layout;