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
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return
        }

        api.get('/tenants/sessions')
            .then(res => setSessions(res.data))
            .catch(err => console.error("Session fetch error:", err))
    }, [navigate]);

    const handleSend = async () => {
        if(!inputText.trim() || !selectedChat) return;

        try {
            const response = await api.post(`/tenants/sessions/${selectedChat.id}/message`, {
                text: inputText
            });

            setSelectedChat(response.data);

            setSessions(prev => prev.map(s => s.id === selectedChat.id ? response.data : s));

            setInputText('')
        } catch (e) {
            console.error("Error sending message:", e);
            alert("Failed to send message. Check console.");
        }
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
                            Back
                        </button>
                    </div>
                </div>
                <h2 className="p-4 font-bold border-b">Recent Conversation</h2>
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
                            <span>Service: <strong>{selectedChat.clientName || selectedChat.phoneNumber}</strong></span>
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
                                placeholder="Reply as agent"
                                />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a client to view their conversation history
                    </div>
                )}
            </div>
        </div>
    );
}