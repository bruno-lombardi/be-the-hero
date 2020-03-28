import React, { useRef, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident({ match }) {
  
  const ongId = localStorage.getItem('ongId');
  const incidentId = match.params.id;

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const valueRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const loadIncident = async (id) => {
      try {
        const response = await api.get(`incidents/${id}`, {
          headers: {
            Authorization: ongId,
          }
        });
        const incident = response.data;
        titleRef.current.value = incident.title;
        descriptionRef.current.value = incident.description;
        valueRef.current.value = incident.value;
      } catch (err) {
        alert(`Não foi possível carregar seu caso. Tente novamente.`);
      }
    }

    if (incidentId) {
      loadIncident(incidentId);      
    }
  }, [incidentId, ongId]);

  async function handleSave(e) {
    e.preventDefault();

    const incident = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      value: Number(valueRef.current.value),
    };

    try {
      if (incidentId) {
        await api.put(`incidents/${incidentId}`, incident, {
          headers: {
            Authorization: ongId
          }
        });
        alert(`Seu caso foi atualizado.`);
        return;
      }
      await api.post('incidents', incident, {
        headers: {
          Authorization: ongId
        }
      });
      alert(`Seu caso foi cadastrado.`);
      history.push('/profile');
    } catch (err) {
      alert(`Ocorreu um erro ao salvar seu caso. Tente novamente.`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>{incidentId ? `Editar caso #${incidentId}` : 'Cadastrar novo caso' }</h1>
          <p>Descreva um caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSave}>
          <input ref={titleRef} placeholder="Título do caso" type="text"/>
          <textarea ref={descriptionRef} placeholder="Descrição" />
          <input ref={valueRef} placeholder="Valor em reais" />

          <button type="submit" className="button">{incidentId ? 'Salvar' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  );
}
