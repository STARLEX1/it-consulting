import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import LeadForm from '../components/LeadForm';

interface Tariff {
  id: number;
  name: string;
  price: number;
  old_price?: number;
  features: string[];
  is_popular: boolean;
}

interface Service {
  slug: string;
  title: string;
  short_desc: string;
  full_desc: string;
  icon: string;
  features: string[];
  tariffs: Tariff[];
}

const iconMap: Record<string, string> = {
  shield: '🛡️',
  cog: '⚙️',
  chart: '📊',
  building: '🏛️',
};

const Landing: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      api.get(`services/${slug}/`)
        .then((res) => {
          setService(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
    }}>
      {/* Header */}
      <section style={{
        padding: '6rem 2rem 4rem',
        background: 'var(--gradient-dark)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-float" style={{
            width: '100px',
            height: '100px',
            background: 'var(--gradient-primary)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            margin: '0 auto 2rem',
          }}>
            {iconMap[service.icon] || '💼'}
          </div>
          
          <h1 className="animate-fade-in" style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            {service.title}
          </h1>
          
          <p className="animate-fade-in" style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            {service.short_desc}
          </p>
        </div>
      </section>

      {/* Description */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div className="animate-fade-in-up" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '3rem',
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
          }}>
            О услуге
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1.125rem',
          }}>
            {service.full_desc}
          </p>
          
          {service.features && service.features.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Преимущества
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
              }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'var(--gradient-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      flexShrink: 0,
                    }}>
                      ✓
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tariffs */}
      <section style={{
        padding: '4rem 2rem',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="animate-fade-in" style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            Тарифные планы
          </h2>
          
          <p className="animate-fade-in" style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '4rem',
            fontSize: '1.125rem',
          }}>
            Выберите подходящий тариф для вашего бизнеса
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {service.tariffs.map((tariff, index) => (
              <div
                key={tariff.id}
                className="card-hover animate-fade-in-up"
                style={{
                  background: 'var(--bg-card)',
                  border: tariff.is_popular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  position: 'relative',
                  animationDelay: `${index * 0.15}s`,
                  transform: tariff.is_popular ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {tariff.is_popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    boxShadow: 'var(--shadow-md)',
                  }}>
                    Популярный выбор
                  </div>
                )}
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)',
                  }}>
                    {tariff.name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                    }}>
                      {tariff.price.toLocaleString()} 
                      </span>
                      <span style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                      }}>
                      ₽
                    </span>
                    {tariff.old_price && (
                      <span style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'line-through',
                        marginLeft: '0.5rem',
                      }}>
                        {tariff.old_price.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </div>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                }}>
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        background: 'rgba(99, 102, 241, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        color: 'var(--primary-light)',
                        flexShrink: 0,
                        marginTop: '0.125rem',
                      }}>
                        ✓
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
  className="btn-primary"
  onClick={() => {
    // Прокрутка к форме заявки
    setTimeout(() => {
      const formSection = document.getElementById('lead-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }}
  style={{
    width: '100%',
    background: tariff.is_popular ? 'var(--gradient-primary)' : 'transparent',
    border: tariff.is_popular ? 'none' : '2px solid var(--primary)',
    color: 'white',
    padding: '1rem',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    if (!tariff.is_popular) {
      e.currentTarget.style.background = 'var(--primary)';
      e.currentTarget.style.color = 'white';
    }
  }}
  onMouseLeave={(e) => {
    if (!tariff.is_popular) {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--primary-light)';
    }
  }}
>
  Выбрать тариф
</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
<section id="lead-form" style={{
  padding: '4rem 2rem',
  maxWidth: '600px',
  margin: '0 auto',
}}>
  <h2 style={{
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  }}>
    Оставить заявку
  </h2>
  <p style={{
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  }}>
    Заполните форму и мы свяжемся с вами в течение 24 часов
  </p>
  
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '2rem',
  }}>
    <LeadForm serviceSlug={slug} />
  </div>
</section>

      {/* CTA */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'var(--gradient-primary)',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'white',
        }}>
          Нужна консультация?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem',
          fontSize: '1.125rem',
        }}>
          Наши эксперты помогут выбрать оптимальное решение
        </p>
        <button 
  onClick={() => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
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
  Получить консультацию
</button>
      </section>
    </div>
  );
};



export default Landing;