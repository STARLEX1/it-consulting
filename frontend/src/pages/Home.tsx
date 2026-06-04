import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LeadForm from '../components/LeadForm';

interface Service {
  slug: string;
  title: string;
  short_desc: string;
  icon: string;
}

const iconMap: Record<string, string> = {
  shield: '🛡️',
  cog: '️',
  chart: '📊',
  building: '🏛️',
};

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('services/')
      .then((res) => setServices(res.data.results || res.data))
      .catch((err) => console.error(err));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg-primary)',
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        background: 'var(--gradient-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="animate-fade-in" style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            <span className="gradient-text">IT-консалтинг</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>для вашего бизнеса</span>
          </h1>
          
          <p className="animate-fade-in" style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            animationDelay: '0.2s',
          }}>
            Профессиональные решения в области информационной безопасности, 
            автоматизации и аудита
          </p>
          
          <div className="animate-fade-in" style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animationDelay: '0.4s',
          }}>
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('contact-form')}
            >
              Получить консультацию
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Наши услуги
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" style={{
        padding: '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'var(--text-primary)',
        }}>
          Наши направления
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '4rem',
          fontSize: '1.125rem',
        }}>
          Комплексные решения для развития вашего бизнеса
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className="card-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '2.5rem',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                background: 'var(--gradient-primary)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
              }}>
                {iconMap[service.icon] || '💼'}
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
              }}>
                {service.title}
              </h3>
              
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}>
                {service.short_desc}
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-light)',
                fontWeight: '600',
              }}>
                Подробнее
                <span style={{ transition: 'transform 0.3s ease' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {[
            { number: '30+', label: 'Сотрудников' },
            { number: '100+', label: 'Проектов' },
            { number: '28+', label: 'Лет на рынке' },
            { number: '100+', label: 'Программных продуктов' },
          ].map((stat, idx) => (
            <div key={idx} style={{
              padding: '2rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
              }}>
                {stat.number}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section с формой */}
      <section id="contact-form" style={{
        padding: '4rem 2rem',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            Оставить заявку
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.125rem',
          }}>
            Заполните форму и мы свяжемся с вами в течение 24 часов
          </p>
          
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '3rem',
          }}>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        padding: '4rem 2rem',
        background: 'var(--gradient-primary)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'white',
        }}>
          Готовы начать проект?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem',
          fontSize: '1.125rem',
        }}>
          Получите бесплатную консультацию наших экспертов
        </p>
        <button 
          onClick={() => scrollToSection('contact-form')}
          style={{
            background: 'white',
            color: 'var(--primary)',
            border: 'none',
            padding: '1rem 3rem',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '1.125rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-lg)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
        >
          Оставить заявку
        </button>
      </section>
    </div>
  );
};

export default Home;