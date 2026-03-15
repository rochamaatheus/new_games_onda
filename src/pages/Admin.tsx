import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllResponses, deleteResponse, updateResponse, getHouseCounts, supabase } from '../lib/supabase';
import type { HouseName, Response } from '../types';
import './Admin.css';

const HOUSES: HouseName[] = ['AGOLGO', 'FILINI', 'KALIDA', 'PERIPOU', 'KONIPAK', 'OCTANI'];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editHouse, setEditHouse] = useState<HouseName>('AGOLGO');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [respData, countData] = await Promise.all([
        getAllResponses(),
        getHouseCounts()
      ]);
      
      if (respData.error) {
        console.error("Erro Supabase:", respData.error);
        alert("Erro ao carregar pergaminho: " + respData.error.message);
      }
      
      if (respData.data) setResponses(respData.data);
      if (countData) setCounts(countData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        fetchData();
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: username.includes('@') ? username : `${username}@admin.com`,
      password: password,
    });

    if (error) {
      alert("Erro ao entrar: " + error.message);
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta inscrição?")) return;
    const { error } = await deleteResponse(id);
    if (error) alert("Erro ao excluir: " + error.message);
    else fetchData();
  };

  const startEdit = (res: Response) => {
    setEditingId(res.id || null);
    setEditName(res.name);
    setEditHouse(res.house_id);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    const { error } = await updateResponse(editingId, editName, editHouse);
    if (error) alert("Erro ao atualizar: " + error.message);
    else {
      setEditingId(null);
      fetchData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="hall-background visible" style={{ opacity: 0.6 }} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card"
        >
          <div className="magic-seal">⚡</div>
          <h1 className="magic-title">Ministério da Gincana</h1>
          <p className="admin-subtitle">Acesso Restrito a Bruxos Autorizados</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input 
                className="magic-input" 
                type="text" 
                placeholder="Nome de Usuário" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="input-group">
              <input 
                className="magic-input" 
                type="password" 
                placeholder="Senha Mágica" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <button className="magic-button" type="submit" disabled={loading}>
              {loading ? "Revelando..." : "Desbloquear"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      <div className="hall-background visible" style={{ opacity: 0.3 }} />
      
      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="header-titles">
            <h1 className="magic-title">O Profeta da Gincana</h1>
            <p className="admin-subtitle">Controle Central de Equipes</p>
          </div>
          <button className="logout-button" onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>
            Sair do Salão
          </button>
        </header>

        <section className="admin-stats">
          <div className="stats-grid">
            {HOUSES.map(house => (
              <motion.div 
                key={house} 
                whileHover={{ scale: 1.05 }}
                className={`stat-card house-${house.toLowerCase()}`}
              >
                <span className="stat-label">{house}</span>
                <span className="stat-value">{counts[house] || 0}</span>
              </motion.div>
            ))}
            <div className="stat-card total-card">
              <span className="stat-label">INSCRITOS</span>
              <span className="stat-value">{responses.length}</span>
            </div>
          </div>
        </section>

        <section className="admin-main-content">
          <div className="table-card">
            <div className="table-header">
              <h2>Registros no Pergaminho</h2>
              <button className="refresh-btn" onClick={fetchData} disabled={loading}>
                {loading ? "..." : "🔄 Atualizar"}
              </button>
            </div>
            
            <div className="table-responsive">
              <table className="magic-table">
                <thead>
                  <tr>
                    <th>Bruxo(a)</th>
                    <th>Equipe Designada</th>
                    <th>Data do Veredito</th>
                    <th className="actions-col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {responses.map(res => (
                      <motion.tr 
                        key={res.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td>
                          {editingId === res.id ? (
                            <input 
                              className="edit-input" 
                              value={editName} 
                              onChange={(e) => setEditName(e.target.value)} 
                            />
                          ) : (
                            <span className="wizard-name">{res.name}</span>
                          )}
                        </td>
                        <td>
                          {editingId === res.id ? (
                            <select 
                              className="edit-select" 
                              value={editHouse} 
                              onChange={(e) => setEditHouse(e.target.value as HouseName)}
                            >
                              {HOUSES.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                          ) : (
                            <span className={`house-badge house-${res.house_id.toLowerCase()}`}>
                              {res.house_id}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="date-cell">
                            {res.created_at ? new Date(res.created_at).toLocaleDateString('pt-BR') : '-'}
                          </span>
                        </td>
                        <td className="actions-col">
                          <div className="action-btns">
                            {editingId === res.id ? (
                              <>
                                <button className="btn-confirm" onClick={handleUpdate} title="Salvar">✔️</button>
                                <button className="btn-cancel" onClick={() => setEditingId(null)} title="Cancelar">❌</button>
                              </>
                            ) : (
                              <>
                                <button className="btn-edit" onClick={() => startEdit(res)} title="Editar">✏️</button>
                                <button className="btn-delete" onClick={() => handleDelete(res.id!)} title="Excluir">🗑️</button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {responses.length === 0 && !loading && (
                <div className="empty-state">Nenhum bruxo encontrado no pergaminho.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
