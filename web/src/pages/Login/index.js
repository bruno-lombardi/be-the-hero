import React, { useRef } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Login() {

  const idRef = useRef(null);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const id = idRef.current.value;
    
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert(`Erro ao fazer login. Verifique seu ID, e tente novamente.`);
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input ref={idRef} type="text" placeholder="Sua ID"/>

          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
