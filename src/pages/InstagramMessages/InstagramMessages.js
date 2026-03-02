import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './InstagramMessages.module.css';

export default function MessagesPage() {
    const [sessions, setSessions] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [inputText, setInputText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/tenants/sessions').then(res => setSessions(res.data));
    }, []);

    const handleSend = async () => {
        if(!inputText.trim() || !selectedChat) return;

        try {
            const newMessage = { role: 'human', text: inputText };
            setSelectedChat(prev => ({
                ...prev,
                history: [...prev.history, newMessage]
            }));
            setInputText('');
        } catch (e) { console.error(e);}
    }

    const handleBack = async () => {
        navigate("/agendar")
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarIcon}>
                    <div className={styles.sidebarBackButon}>
                        <button className={styles.backButton}
                            type='button'
                            onClick={handleBack}
                            aria-label='voltar'
                        >
                            <span className={styles.arrow}>&#8592;</span>
                            Voltar
                        </button>
                    </div>
                </div>
                <h2 className="p-4 font-bold border-b">Conversas Recentes</h2>
                {sessions.map(s => (
                    <div
                        key={s.id}
                        onClick={() => setSelectedChat(s)}
                        className={`${styles.chatListItem} ${selectedChat?.id === s.id ? styles.activeChat : ''}`}
                    >
                        <div className={styles.chatInfo}>
                            <p className={styles.phone}>{s.clientName || `ID: ...${s.phoneNumber.slice(-5)}`}</p>
                            <p className={styles.lastMsg}>{s.history[s.history.length -1]?.text}</p>
                            <span className={`${styles.platformIcon} ${s.platform === 'instagram' ? styles.bgInstagram : styles.bgWhatsApp}`}>
                                {s.platform}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chatArea}>
                {selectedChat ? (
                    <>
                        <div className={styles.chatHeader}>
                            <span>Atendimento: <strong>{selectedChat.clientName || selectedChat.phoneNumber}</strong></span>
                        </div>
                        <div className={styles.messages}>
                            {selectedChat.history.map((msg, idx) => {
                                //Lógica de cores baseada no ROLE
                                const isUser = msg.role === 'user';
                                const isBot = msg.role === 'model';

                                return (
                                    <div key={idx} className={isUser ? styles.msgUser : (isBot ? styles.msgBot : styles.msgHuman)}>
                                        <small className={isUser ? styles.labelUser : (isBot ? styles.labelBot : styles.labelHuman)}>
                                            {isUser ? 'Cliente' : (isBot ? 'ChatBot' : 'Agente Humano')}
                                        </small>
                                        <p>{msg.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.inputArea}>
                            <input 
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Intervir como humano"
                                />
                            <button onClick={handleSend}>Enviar</button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Selecione uma cliente para visualizar o histórico
                    </div>
                )}
            </div>
        </div>
    );
}