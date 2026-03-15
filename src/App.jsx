import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

// ========= АНИМАЦИИ =============
const spotAnim = keyframes`
  0% { box-shadow: 0 0 100px 40px #FFD60055, 0 0 15px 5px #FF3F3F88; }
  50% { box-shadow: 0 0 180px 80px #FFD600cc, 0 0 30px 10px #FF3F3FDD; }
  100% { box-shadow: 0 0 100px 40px #FFD60055, 0 0 15px 5px #FF3F3F88; }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
`;

// ========= СТИЛИ =============
const Main = styled.div`
  background: #060606;
  min-height: 100vh;
  color: #ffd600;
  font-family: 'Montserrat', Arial, sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  overflow-x: hidden;
`;

const Spotlights = styled.div`
  width: 100vw;
  height: 240px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 38vw;
    height: 240px;
    opacity: 0.9;
    border-radius: 50% 50% 80% 80%;
    filter: blur(30px);
    animation: ${spotAnim} 3.8s infinite alternate;
  }
  &::before {
    left: 5vw;
    background: linear-gradient(120deg, #FFD60022 30%, #FF3F3F 100%);
  }
  &::after {
    right: 5vw;
    background: linear-gradient(60deg, #FF3F3F55 15%, #FFD60077 80%);
    animation-delay: 1.2s;
  }
`;

const Header = styled(motion.div)`
  margin-top: 130px;
  text-align: center;
  z-index: 2;
  max-width: 95vw;
`;

const Title = styled(motion.h1)`
  font-size: 3.4rem;
  margin-bottom: 0.3rem;
  letter-spacing: 6px;
  font-weight: 900;
  background: linear-gradient(90deg, #ffd600, #ff3f3f 65%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  animation: ${pulseGlow} 2.5s infinite;
  @media (max-width: 600px) {
    font-size: 2.2rem;
    letter-spacing: 3px;
  }
`;

const SubTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 21px;
  font-weight: 600;
  background: linear-gradient(90deg, #ffd600 65%, #ff3f3f 120%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const RegisterButton = styled(motion.button)`
  position: fixed;
  top: 36px;
  right: 44px;
  z-index: 10;
  padding: 18px 32px;
  font-size: 1.15rem;
  font-weight: 800;
  border-radius: 40px;
  color: #060606;
  background: linear-gradient(90deg, #FFD600, #ff3f3f 75%);
  border: none;
  box-shadow: 0 2px 16px #ffd60077, 0 1px 4px #FF3F3F55;
  cursor: pointer;
  transition: box-shadow 0.15s;
  outline: none;
  font-family: 'Montserrat', Arial, sans-serif;
  &:hover {
    box-shadow: 0 4px 36px #ff3f3f99, 0 1px 8px #ffd60088;
  }
  @media (max-width: 600px) {
    top: 16px;
    right: 12px;
    padding: 12px 18px;
    font-size: 0.95rem;
  }
`;

const Microphone = styled(motion.div)`
  position: absolute;
  left: 13vw;
  top: 35vh;
  z-index: 1;
  @media (max-width: 800px) {
    left: 6vw;
    top: 30vh;
    svg {
      width: 70px;
    }
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const Description = styled(motion.div)`
  background: rgba(20, 20, 20, 0.97);
  color: #fff;
  border: 2px solid #FF3F3F77;
  border-radius: 24px;
  box-shadow: 0 4px 36px #ffd60044, 0 2px 10px #ff3f3f66;
  font-size: 1.16rem;
  line-height: 1.6;
  padding: 38px 32px 28px 32px;
  margin: 50px auto 32px auto;
  max-width: 520px;
  width: 90%;
  text-align: center;
  animation: ${spotAnim} 2.7s infinite alternate;
  strong {
    color: #FFD600;
  }
`;

const RegCounter = styled.div`
  margin: 24px 0 10px 0;
  color: #ffd600;
  background: #101013;
  display: inline-block;
  font-size: 1.15rem;
  padding: 8px 28px;
  border-radius: 18px;
  font-weight: 700;
  box-shadow: 0 2px 15px #ffd60033;
`;

const StyledForm = styled(motion.form)`
  background: #181818;
  padding: 38px 28px 28px 28px;
  border-radius: 24px;
  border: 2px solid #FFD60099;
  box-shadow: 0 6px 36px #ffd60049, 0 2px 10px #ff3f3f99;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 320px;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  position: relative;
  z-index: 12;
  input {
    background: #fff;
    border: none;
    border-radius: 12px;
    padding: 13px 16px;
    font-size: 1.07rem;
    font-weight: 600;
    outline: none;
    font-family: 'Montserrat', Arial, sans-serif;
    color: #111;
  }
  button[type="submit"] {
    margin-top: 8px;
    background: linear-gradient(90deg, #FFD600 28%, #ff3f3f 90%);
    color: #050505;
    font-weight: 800;
    border: none;
    font-size: 1.21rem;
    padding: 13px 0;
    border-radius: 16px;
    box-shadow: 0 2px 12px #FFD60066;
    cursor: pointer;
    transition: box-shadow 0.15s;
    font-family: 'Montserrat', Arial, sans-serif;
    &:hover {
      box-shadow: 0 5px 18px #ff3f3f99, 0 2px 10px #ffd60099;
    }
  }
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  margin: 0 0 8px 0;
  background: linear-gradient(90deg, #ffd600, #ff3f3f 65%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  letter-spacing: 2px;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 20;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const SuccessMessage = styled(motion.div)`
  background: #111;
  color: #FFD600;
  padding: 48px 38px;
  border-radius: 22px;
  border: 2px solid #FFD600;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 6px 42px #FFD60088, 0 2px 16px #FF3F3F88;
  max-width: 380px;
`;

const AdminPanel = styled.div`
  background: #181818;
  color: #FFD600;
  border: 2px solid #FF3F3F77;
  box-shadow: 0 4px 36px #ffd60044, 0 2px 10px #ff3f3f66;
  border-radius: 20px;
  padding: 30px;
  margin: 40px auto 10px auto;
  max-width: 700px;
  width: 90%;
  min-height: 200px;
  z-index: 5;
  position: relative;
`;

const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 12px 10px;
    border-bottom: 1px solid #FF3F3F77;
    color: #FFD600;
    background: #111;
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: 0.95rem;
  }
  th {
    color: #ff3f3f;
    font-weight: bold;
  }
  tr:last-child td { border-bottom: none; }
`;

const AdminInput = styled.input`
  padding: 8px 13px;
  font-size: 1.1rem;
  margin-right: 14px;
  border-radius: 8px;
  border: 2px solid #FF3F3F77;
  font-family: 'Montserrat', Arial, sans-serif;
  background: #111;
  color: #FFD600;
`;

const AdminButton = styled.button`
  background: linear-gradient(90deg, #FFD600 28%, #ff3f3f 90%);
  color: #181818;
  font-weight: 800;
  border-radius: 8px;
  border: none;
  padding: 8px 26px;
  font-size: 1.05rem;
  margin-left: 4px;
  cursor: pointer;
  transition: background 0.15s;
  font-family: 'Montserrat', Arial, sans-serif;
  &:hover { background: #ff3f3f; color: #FFD600; }
`;

// ========== КОД ================
function App() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ fio: "", age: "", city: "", phone: "" });
  const [count, setCount] = useState(0);
  const [adminMode, setAdminMode] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [adminPw, setAdminPw] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  useEffect(() => {
    axios.get("/api/count")
      .then(res => setCount(res.data.count))
      .catch(() => setCount(0));
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", form);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2500);
      setForm({ fio: "", age: "", city: "", phone: "" });
    } catch {
      alert("Ошибка регистрации. Попробуйте ещё раз.");
    }
  };

  async function handleAdminLogin(e) {
    e.preventDefault();
    setAdminLoginError('');
    try {
      const resp = await axios.post("/api/admin/login", { password: adminPw });
      if (resp.data && resp.data.success && resp.data.token) {
        const pResp = await axios.get("/api/participants", {
          headers: { Authorization: `Bearer ${resp.data.token}` },
        });
        setParticipants(pResp.data.participants || []);
        setAdminMode(true);
        setAdminLoginError("");
      } else {
        setAdminLoginError("Неверный пароль");
      }
    } catch {
      setAdminLoginError("Ошибка! Проверьте пароль и попробуйте ещё раз.");
    }
  }

  const adminLogout = () => {
    setAdminMode(false);
    setAdminPw('');
    setParticipants([]);
  };

  return (
    <Main>
      <Spotlights />

      <RegisterButton
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowModal(true)}
      >
        Зарегистрироваться
      </RegisterButton>

      <Microphone
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none" aria-hidden="true">
          <rect x="32" y="8" width="36" height="72" rx="18" fill="#FFD600" stroke="#FF3F3F" strokeWidth="4" />
          <path d="M16 70c0 18.78 15.22 34 34 34s34-15.22 34-34" stroke="#FF3F3F" strokeWidth="5" fill="none" strokeLinecap="round" />
          <line x1="50" y1="104" x2="50" y2="130" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
          <line x1="28" y1="130" x2="72" y2="130" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </Microphone>

      <Header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          DMT SHOW
        </Title>
        <SubTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          ComedyCollab — комедийное шоу
        </SubTitle>
        <RegCounter>Участников зарегистрировано: <b>{count}</b></RegCounter>
      </Header>

      <Description
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <strong>Добро пожаловать на DMT Show!</strong>
        <br /><br />
        Это уникальное комедийное шоу, где каждый может проявить себя.
        Зарегистрируйтесь и станьте частью незабываемого вечера юмора и веселья!
        <br /><br />
        <span style={{ color: "#FF3F3F", fontWeight: 700 }}>Регистрация открыта!</span>
      </Description>

      {showModal && (
        <ModalOverlay onClick={() => { setShowModal(false); setSuccess(false); }}>
          <div onClick={e => e.stopPropagation()}>
            {success ? (
              <SuccessMessage
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                🎉 Вы успешно зарегистрированы!<br />Ждём вас на шоу!
              </SuccessMessage>
            ) : (
              <StyledForm
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <FormTitle>Регистрация</FormTitle>
                <input
                  required
                  placeholder="ФИО"
                  value={form.fio}
                  onChange={e => setForm(f => ({ ...f, fio: e.target.value }))}
                />
                <input
                  required
                  placeholder="Возраст"
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                />
                <input
                  required
                  placeholder="Город"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                />
                <input
                  required
                  placeholder="Телефон"
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
                <button type="submit">Зарегистрироваться</button>
              </StyledForm>
            )}
          </div>
        </ModalOverlay>
      )}

      {!adminMode ? (
        <AdminPanel>
          <b>Вход для организаторов</b>
          <form onSubmit={handleAdminLogin} style={{ marginTop: 16, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <AdminInput
              type="password"
              placeholder="Пароль"
              value={adminPw}
              onChange={e => setAdminPw(e.target.value)}
            />
            <AdminButton type="submit">Войти</AdminButton>
          </form>
          {adminLoginError && <div style={{ color: "#FF3F3F", marginTop: 10 }}>{adminLoginError}</div>}
        </AdminPanel>
      ) : (
        <AdminPanel>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <b>Список участников ({participants.length})</b>
            <AdminButton onClick={adminLogout}>Выйти</AdminButton>
          </div>
          <AdminTable>
            <thead>
              <tr>
                <th>#</th>
                <th>ФИО</th>
                <th>Возраст</th>
                <th>Город</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, i) => (
                <tr key={p.id || p.registeredAt + i}>
                  <td>{i + 1}</td>
                  <td>{p.fio}</td>
                  <td>{p.age}</td>
                  <td>{p.city}</td>
                  <td>{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
          {participants.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 20, color: "#fff" }}>Нет участников</div>
          )}
        </AdminPanel>
      )}
    </Main>
  );
}

export default App;
