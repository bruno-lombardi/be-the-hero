import React, { useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const whatsappRef = useRef(null);
  const cityRef = useRef(null);
  const ufRef = useRef(null);
  
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const ong = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      whatsapp: whatsappRef.current.value,
      city: cityRef.current.value,
      uf: ufRef.current.value,
    };
    try {
      const response = await api.post('ongs', ong);
      alert(`Seu ID de acesso: ${response.data.id}`);

      nameRef.current.value = '';
      emailRef.current.value = '';
      whatsappRef.current.value = '';
      cityRef.current.value = '';
      ufRef.current.value = '';

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrar os casos da sua ONG.</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input ref={nameRef} placeholder="Nome da ONG" type="text"/>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={whatsappRef} placeholder="Whatsapp" type="text"/>

          <div className="input-group">
            <input ref={cityRef} type="text" placeholder="Cidade" />
            <input ref={ufRef} type="text" placeholder="UF" style={{width: 80 }} />
          </div>

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
