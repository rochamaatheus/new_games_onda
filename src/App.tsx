import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from './constants/houses';
import { calculateScores, findBestHouse } from './utils/sorting';
import { getHouseCounts, submitSorting } from './lib/supabase';
import type { HouseName } from './types';
import chapeuImg from './assets/chapeu_seletor.png'; 
import musicaTema from './assets/musica_tema.mp3'; 
import './index.css';

const MagicParticles = ({ visible }: { visible: boolean }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  return (
    <div className={`particles-container ${visible ? 'visible' : ''}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.2, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

type Step = 'welcome' | 'landing' | 'quiz' | 'submitting' | 'success';

function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          requestAnimationFrame(() => {
            setHeight(entry.contentRect.height);
          });
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const enterHall = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsMuted(false)).catch(e => console.log("Audio play blocked", e));
    }
    setStep('landing');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      else audioRef.current.pause();
      setIsMuted(!isMuted);
    }
  };

  const startQuiz = () => {
    if (name.trim().length < 3) {
      alert("Por favor, digite seu nome completo.");
      return;
    }
    setStep('quiz');
  };

  const handleAnswer = (points: any) => {
    setAnswers({ ...answers, [QUESTIONS[currentQuestionIndex].id]: points });
    if (currentQuestionIndex < QUESTIONS.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
    else finishQuiz();
  };

  const finishQuiz = async () => {
    setStep('submitting');
    try {
      const scores = calculateScores({ ...answers });
      const counts = await getHouseCounts();
      const houseId = findBestHouse(scores, counts as Record<HouseName, number>);
      const { error } = await submitSorting(name, houseId);
      if (error) throw error;
      setStep('success');
    } catch (err) {
      console.error(err);
      setStep('landing');
      alert("Erro ao processar. Tente novamente.");
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicaTema} loop />
      
      <div className={`hall-background ${step !== 'welcome' ? 'visible' : ''}`} />
      
      {step !== 'welcome' && (
        <button onClick={toggleMusic} className="sound-button" style={{
          position: 'fixed', top: '15px', right: '15px', background: 'rgba(197, 160, 89, 0.2)',
          border: '1px solid var(--magic-gold)', borderRadius: '50%', width: '35px', height: '35px',
          cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--magic-gold)', fontSize: '1rem'
        }}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}

      <MagicParticles visible={step !== 'welcome'} />
      
      <motion.div 
        animate={{ height }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="magic-container"
        style={{ overflow: 'hidden' }}
      >
        <div ref={containerRef} style={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step + (step === 'quiz' ? currentQuestionIndex : '')}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '30px 25px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {step === 'welcome' && (
                <div className="content-step">
                  <h1 className="magic-title">New Games 2026</h1>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8 }}>
                    O Salão está em silêncio...
                  </p>
                  <button className="magic-button" onClick={enterHall}>Entrar no Salão</button>
                </div>
              )}

              {step === 'landing' && (
                <div className="content-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h1 className="magic-title" style={{ fontSize: '1.5rem' }}>Identificação</h1>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginBottom: '1.2rem' }}
                  >
                    <img src={chapeuImg} alt="Chapéu Seletor" style={{ width: '110px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(197, 160, 89, 0.4))' }} />
                  </motion.div>
                  <input
                    type="text"
                    className="magic-input"
                    placeholder="Seu nome completo..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <button className="magic-button" onClick={startQuiz}>Iniciar</button>
                </div>
              )}

              {step === 'quiz' && (
                <div className="content-step" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ color: 'var(--magic-gold)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>
                    QUESTÃO {currentQuestionIndex + 1} / {QUESTIONS.length}
                  </p>
                  <h2 className="question-text">{QUESTIONS[currentQuestionIndex].text}</h2>
                  <div className="options-container">
                    {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                      <button key={idx} className="option-button" onClick={() => handleAnswer(option.points)}>
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'submitting' && (
                <div className="content-step" style={{ padding: '20px' }}>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginBottom: '1rem' }}
                  >
                    <img src={chapeuImg} alt="Chapéu Seletor" style={{ width: '90px', height: 'auto' }} />
                  </motion.div>
                  <h2 className="magic-title" style={{ fontSize: '1.2rem' }}>Analisando seu perfil...</h2>
                </div>
              )}

              {step === 'success' && (
                <div className="content-step">
                  <h1 className="magic-title" style={{ fontSize: '1.5rem' }}>Concluído!</h1>
                  <p className="success-message">Perfil registrado com sucesso.</p>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
                    A revelação será na gincana presencial!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default App;
