import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showQuickResponses, setShowQuickResponses] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const quickResponseOptions = [
        "Tell me a joke",
        "What can you do?",
        "How does AI work?",
        "Write a poem"
    ];

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const quickResponse = (text) => {
        sendMessage(text);
        setShowQuickResponses(false);
    };

    const sendMessage = async (message) => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        setShowQuickResponses(false);
        setInput('');
        setIsTyping(true);

        // Add user message
        const newMessage = { id: Date.now(), text: trimmedMessage, sender: 'user' };
        setMessages(prev => [...prev, newMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: trimmedMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const { reply } = await response.json();
            const formattedReply = formatText(reply);

            // Add bot message
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: formattedReply,
                sender: 'bot'
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I encountered an error. Please try again.",
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const formatText = (text) => {
        if (typeof text !== 'string') {
            console.error('Invalid text input:', text);
            return '';
        }
        return text;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>AI Chat Assistant</h1>
                <p className={styles.subtitle}>Ask me anything! I'm here to help.</p>
            </header>

            {showQuickResponses && (
                <div className={styles.quickResponses}>
                    {quickResponseOptions.map((text, index) => (
                        <button
                            key={index}
                            onClick={() => quickResponse(text)}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.chatArea}>
                {messages.map((message) => (
                    <div key={message.id} className={styles.messageWrapper}>
                        <div
                            className={
                                message.sender === 'bot'
                                    ? styles.botMessage
                                    : styles.userMessage
                            }
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className={styles.typing}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    className={styles.input}
                />
                <button
                    onClick={() => sendMessage(input)}
                    className={styles.sendButton}
                    disabled={!input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}