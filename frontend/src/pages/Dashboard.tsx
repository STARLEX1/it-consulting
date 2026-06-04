import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: {
    title: string;
  } | null;
  status: string;
  message?: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'leads'>('profile');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const leadsRes = await api.get('leads/my/');
      setLeads(leadsRes.data.results || leadsRes.data);
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: '#3b82f6',
      in_progress: '#f59e0b',
      closed: '#10b981',
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      new: 'Новая',
      in_progress: 'В работе',
      closed: 'Закрыта',
    };
    return texts[status] || status;
  };

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            Личный кабинет
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Добро пожаловать, {user?.username || user?.email}!
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem',
        }}>
          {[
            { id: 'profile', label: 'Профиль', icon: '👤' },
            { id: 'leads', label: 'Заявки', icon: '📝', count: leads.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{
                  background: 'var(--primary-light)',
                  color: 'white',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
              }}>
                Информация о профиле
              </h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Email
                  </label>
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                  }}>
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Имя пользователя
                  </label>
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                  }}>
                    {user?.username}
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Роль
                  </label>
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    textTransform: 'capitalize',
                  }}>
                    {user?.role === 'admin' ? 'Администратор' : 'Клиент'}
                  </div>
                </div>

<div>
  <label style={{
    display: 'block',
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  }}>
    Дата регистрации
  </label>
  <div style={{
    padding: '0.875rem 1rem',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
  }}>
    {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('ru-RU') : '-'}
  </div>
</div>
              </div>

              <button
                onClick={logout}
                style={{
                  marginTop: '2rem',
                  padding: '0.875rem 2rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="animate-fade-in">
            {leads.length === 0 ? (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  fontSize: '1.25rem',
                }}>
                  У вас пока нет заявок
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Оставьте заявку на консультацию
                </p>
                <a
                  href="/"
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Оставить заявку
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}>
                      <div>
                        <h3 style={{
                          color: 'var(--text-primary)',
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem',
                        }}>
                          {lead.name}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                          {lead.email}
                        </p>
                        {lead.phone && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            {lead.phone}
                          </p>
                        )}
                        {lead.service && (
                          <p style={{ color: 'var(--primary-light)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Услуга: {lead.service.title}
                          </p>
                        )}
                        {lead.company && (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Компания: {lead.company}
                          </p>
                        )}
                      </div>
                      <div style={{
                        padding: '0.5rem 1rem',
                        background: `${getStatusColor(lead.status)}20`,
                        border: `1px solid ${getStatusColor(lead.status)}`,
                        borderRadius: '8px',
                        color: getStatusColor(lead.status),
                        fontWeight: '600',
                        fontSize: '0.875rem',
                      }}>
                        {getStatusText(lead.status)}
                      </div>
                    </div>
                    
                    {lead.message && (
                      <div style={{
                        padding: '1rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                      }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                          {lead.message}
                        </p>
                      </div>
                    )}
                    
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
                      Создана: {new Date(lead.created_at).toLocaleString('ru-RU')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;