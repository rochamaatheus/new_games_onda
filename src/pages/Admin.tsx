import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    // Check if already logged in via Supabase session
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
    
    // Tentativa de login no Supabase
    // Como o usuário pediu kelsu/malodms123, usaremos o email kelsu@admin.com por padrão
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

  const fetchData = async () => {
    setLoading(true);
    const [respData, countData] = await Promise.all([
      getAllResponses(),
      getHouseCounts()
    ]);
    
    if (respData.data) setResponses(respData.data);
    if (countData) setCounts(countData);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card"
        >
          <h1 className="magic-title">Admin Gincana</h1>
          <form onSubmit={handleLogin}>
            <input 
              className="magic-input" 
              type="text" 
              placeholder="Usuário (ex: kelsu)" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              className="magic-input" 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="magic-button" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1 className="magic-title">Painel de Controle</h1>
        <button className="magic-button" onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
          Sair
        </button>
      </header>

      <section className="admin-stats">
        <div className="stats-grid">
          {HOUSES.map(house => (
            <div key={house} className="stat-card">
              <span className="stat-label">{house}</span>
              <span className="stat-value">{counts[house] || 0}</span>
            </div>
          ))}
          <div className="stat-card total">
            <span className="stat-label">TOTAL</span>
            <span className="stat-value">{responses.length}</span>
          </div>
        </div>
      </section>

      <section className="admin-table-container">
        <div className="table-header">
          <h2>Inscrições ({responses.length})</h2>
          <button className="refresh-button" onClick={fetchData} disabled={loading}>🔄</button>
        </div>
        
        <div className="scroll-area">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Equipe</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {responses.map(res => (
                <tr key={res.id}>
                  <td>
                    {editingId === res.id ? (
                      <input 
                        className="table-input" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)} 
                      />
                    ) : (
                      res.name
                    )}
                  </td>
                  <td>
                    {editingId === res.id ? (
                      <select 
                        className="table-select" 
                        value={editHouse} 
                        onChange={(e) => setEditHouse(e.target.value as HouseName)}
                      >
                        {HOUSES.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    ) : (
                      <span className={`house-tag ${res.house_id.toLowerCase()}`}>{res.house_id}</span>
                    )}
                  </td>
                  <td>{res.created_at ? new Date(res.created_at).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="action-buttons">
                      {editingId === res.id ? (
                        <>
                          <button className="btn-save" onClick={handleUpdate}>✅</button>
                          <button className="btn-cancel" onClick={() => setEditingId(null)}>❌</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => startEdit(res)}>✏️</button>
                          <button className="btn-delete" onClick={() => handleDelete(res.id!)}>🗑️</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
