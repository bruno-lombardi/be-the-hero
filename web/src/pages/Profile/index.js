import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const listIncidents = async () => {
      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: ongId
          }
        });
        setIncidents(response.data);
      } catch (err) {
        alert(`Ocorreu um erro ao listar seus casos.`);
      }
    }
    listIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(inc => inc.id !== id));
    } catch (err) {
      alert(`Erro ao deletar caso. Tente novamente.`);
    }
  }

  function handleLogout() {
    localStorage.removeItem('ongId');
    localStorage.removeItem('ongName');

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
            
            <Link to={`incidents/edit/${incident.id}`}>
              <FiEdit2 size={20} color="#e02041"/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
