import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

// ========= СТИЛИ =============
const spotAnim = keyframes`
  0% { box-shadow: 0 0 100px 40px #FFD60055, 0 0 15px 5px #FF3F3F88; }
  50% { box-shadow: 0 0 180px 80px #FFD600cc, 0 0 30px 10px #FF3F3FDD; }
  100% { box-shadow: 0 0 100px 40px #FFD60055, 0 0 15px 5px #FF3F3F88; }
`;

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
`;

const Spotlights = styled.div`
  width: 100vw;
  height: 240px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  &:before, &:after {
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
  &:before {
    left: 5vw;
    background: linear-gradient(120deg, #FFD60022 30%, #FF3F3F 100%);
  }
  &:after {
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
  text-shadow: 0 0 24px #ffd60066, 0 0 8px #ff3f3f88;
`;

const SubTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 21px;
  font-weight: 600;
  background: linear-gradient(90deg, #ffd600 65%, #ff3f3f 120%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProfileButton = styled(motion.button)`
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
  transition: 0.1s;
  outline: none;
  &:hover {
    transform: scale(1.1) rotate(-2deg);
    box-shadow: 0 4px 36px #ff3f3f99, 0 1px 8px #ffd60088;
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
`;

const Description = styled(motion.div)`
  background: rgba(20, 20, 20, 0.97);
  color: #fff;
  border: 2px solid #FF3F3F77;
  border-radius: 24px;
  box-shadow: 0 4px 36px #ffd60044, 0 2px 10px #ff3f3f66;
  font-size: 1.16rem;
  line-height: 1.5;
  padding: 38px 24px 24px 24px;
  margin: 0 auto 32px auto;
  margin-top: 50px;
  max-width: 520px;
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
  padding: 38px 22px 25px 22px;
  border-radius: 24px;
  border: 2px solid #FFD60099;
  box-shadow: 0 6px 36px #ffd60049, 0 2px 10px #ff3f3f99;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 320px;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  position: relative;
  z-index: 12;
  input {
    background: #fff;
    border: none;
    border-radius: 12px;
    padding: 13px;
    font-size: 1.07rem;
    font-weight: 600;
    outline: none;
    margin-bottom: 7px;
  }
  button {
    margin-top: 14px;
    background: linear-gradient(90deg, #FFD600 28%, #ff3f3f 90%);
    color: #050505;
    font-weight: 800;
    border: none;
    font-size: 1.21rem;
    padding: 13px 0;
    border-radius: 16px;
    box-shadow: 0 2px 12px #FFD60066;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      transform: scale(1.04);
      box-shadow: 0 5px 18px #ff3f3f99, 0 2px 10px #ffd60099;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 20;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0,0,0,0.80);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessMessage = styled(motion.div)`
  background: #111;
  color: #FFD600;
  padding: 38px;
  border-radius: 22px;
  border: 2px solid #FFD600;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 6px 42px #FFD60088, 0 2px 16px #FF3F3F88;
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
  min-height: 200px;
  z-index: 100;
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
  }
  th { color: #ff3f3f; font-weight: bold;}
  tr:last-child td { border-bottom: none; }
`;

const AdminInput = styled.input`
  padding: 8px 13px;
  font-size: 1.1rem;
  margin-right: 14px;
  border-radius: 8px;
  border: 2px solid #FF3F3F77;
`;

const AdminButton = styled.button`
  background: linear-gradient(90deg, #FFD600 28%, #ff3f3f 90%);
  color: #181818;
  font-weight: 800;
  border-radius: 8px;
  border: none;
  padding: 8px 26px;
  font-size: 1.13rem;
  margin-left: 4px;
  cursor: pointer;
  transition: 0.15s;
  &:hover { background: #ff3f3f; color: #FFD600;}
`;

// ========== КОД ================
function App() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({fio: "", age: "", city: "", phone: ""});
  const [count, setCount] = useState(0);
  // Для админки:
  const [adminMode, setAdminMode] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [adminPw, setAdminPw] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Получаем число регистраций
  useEffect(()=>{
    axios.get("/api/count")
      .then(res=>setCount(res.data.count))
      .catch(()=>setCount(0));
  }, [success]);

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", form);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2300);
      setForm({fio:"",age:"",city:"",phone:""});
    } catch {
      alert("Ошибка регистрации. Попробуйте ещё раз.");
    }
  };

  // -------- Админка ---------
  async function handleAdminLogin(e) {
    e.preventDefault();
    setAdminLoginError('');
    try {
      const resp = await axios.post("/api/admin/login", {password: adminPw});
      if(resp.data && resp.data.success && resp.data.token) {
        const token = resp.data.token;
        setAdminToken(token);
        setAdminMode(true);
        // Получить участников
        const pResp = await axios.get("/api/participants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParticipants(pResp.data.participants || []);
        setAdminLoginError("");
      } else setAdminLoginError("Неверный пароль");
    } catch {
      setAdminLoginError("Ошибка! Проверьте пароль и попробуйте ещё раз.");
    }
  }

  // Обновить список участников
  const reloadParticipants = async () => {
    try {
      const pResp = await axios.get("/api/participants", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setParticipants(pResp.data.participants || []);
    } catch {
      setAdminLoginError("Ошибка загрузки участников.");
    }
  };

  // Для выхода из админки
  const adminLogout = () => {
    setAdminMode(false);
    setAdminToken('');
    setAdminPw('');
  }

  return (
    <Main>
      <Spotlights />
      <ProfileButton
        whileHover={{ scale: 1.07, rotate: -3 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setShowModal(true)}
      >
        Профиль
      </ProfileButton>
      {/* КНОПКА АДМИНКИ */}
      <ProfileButton
        style={{top:"95px", right:"44px", background:'#ff3f3f', color:'#FFD600'}}
        onClick={() => setAdminMode("try")}
      >
        Админка
      </ProfileButton>
      <Header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}>
        <Title layoutId="title">DMTshow</Title>
        <SubTitle>Comedy Collab — отбор ярких и смелых комедиантов.</SubTitle>
      </Header>
      <Microphone
        initial={{opacity:0, y:30}}
        animate={{opacity:1, y:0}}
        transition={{delay: 0.7, duration:0.8}}
      >
        <svg width="90" viewBox="0 0 48 140" fill="none">
          <ellipse cx="24" cy="36" rx="22" ry="34" fill="#232323" stroke="#ffd600" strokeWidth="6"/>
          <rect x="15" y="64" width="18" height="62" rx="9" fill="#404040" stroke="#FF3F3F" strokeWidth="4"/>
          <ellipse cx="24" cy="132" rx="12" ry="7" fill="#FFD600" />
          <ellipse cx="24" cy="128" rx="12" ry="4" fill="#FF3F3F"/>
        </svg>
      </Microphone>
      <RegCounter>
        Уже зарегистрировалось: <span style={{color:'#ff3f3f'}}>{count}</span> участников!
      </RegCounter>
      <Description
        initial={{ scale:0.8, opacity:0 }}
        whileInView={{scale:1, opacity:1}}
        transition={{duration:0.8, delay:0.5}}
      >
        <strong>DMTshow</strong> — твой пропуск на сцену! <br />
        Мы собираем юмористов, КВНщиков, актеров и всех, кто умеет смешить людей и хочет выступать на сцене.<br />
        <br />
        <strong>DMTshow</strong> — шанс вырваться на большую сцену, удивить зрителей и получить свою минуту славы.<br />
        <br />
        <span style={{color:"#FFD600", fontWeight:700}}>
        Хватит шутить для друзей на кухне — пора рвать зал на сцене вместе с DMTshow! <br/>
        </span>
        Зарегистрируйся и поборись за главные призы яркой комедии!
      </Description>
      {showModal && (<ModalOverlay onClick={()=>setShowModal(false)}>
        {!success ?
          <StyledForm
            as={motion.form}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={e=>e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <input
              required
              placeholder="ФИО"
              value={form.fio}
              onChange={e=>setForm(f=>({...f, fio:e.target.value}))}
            />
            <input
              required
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Возраст"
              min={12}
              max={99}
              value={form.age}
              onChange={e=>setForm(f=>({...f, age:e.target.value.replace(/\D/,'')}))}
            />
            <input
              required
              placeholder="Город"
              value={form.city}
              onChange={e=>setForm(f=>({...f, city:e.target.value}))}
            />
            <input
              required
              placeholder="Телефон"
              type="tel"
              maxLength={17}
              value={form.phone}
              onChange={e=>setForm(f=>({...f, phone:e.target.value.replace(/[^\d+()-]/g,'')}))}
            />
            <button type="submit">Зарегистрироваться</button>
          </StyledForm>
        :
          <SuccessMessage
            initial={{ scale:0.7, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
          >
            Спасибо за регистрацию.<br/>
            Команда DMTshow свяжется с вами.
          </SuccessMessage>
        }
      </ModalOverlay>)}

      {/* АДМИНКА */}
      {adminMode && adminMode==="try" && (
        <ModalOverlay>
          <AdminPanel>
            <form onSubmit={handleAdminLogin}>
              <label>
                <AdminInput
                  type="password"
                  placeholder="Пароль"
                  value={adminPw}
                  onChange={e=>setAdminPw(e.target.value)}
                />
              </label>
              <AdminButton type="submit">Войти</AdminButton>
            </form>
            <div style={{color:'#ff3f3f',marginTop:'12px'}}>{adminLoginError}</div>
            <AdminButton style={{marginTop:'14px'}} onClick={adminLogout}>Закрыть</AdminButton>
          </AdminPanel>
        </ModalOverlay>
      )}
      {adminMode===true && (
        <ModalOverlay>
          <AdminPanel>
            <h2>Админка DMTshow</h2>
            <div>Количество регистраций: <strong>{participants.length}</strong></div>
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
                {participants.map((p, i)=>
                  <tr key={p.id || p.phone+i}>
                    <td>{i+1}</td>
                    <td>{p.fio}</td>
                    <td>{p.age}</td>
                    <td>{p.city}</td>
                    <td>{p.phone}</td>
                  </tr>
                )}
              </tbody>
            </AdminTable>
            <AdminButton onClick={reloadParticipants}>Обновить</AdminButton>
            <AdminButton onClick={adminLogout}>Выход</AdminButton>
          </AdminPanel>
        </ModalOverlay>
      )}
    </Main>
  );
}

export default App;
