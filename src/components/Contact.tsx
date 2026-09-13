'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Check, Copy, ArrowUpRight, MessageSquare } from 'lucide-react';

const topics = ['A website', 'A SaaS product', 'A collaboration'];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  const email = 'imadesantana29@gmail.com';
  const href = `mailto:${email}?subject=${encodeURIComponent(topic + ' inquiry')}&body=${encodeURIComponent("Hi Santa,\n\nI'd like to talk about " + topic.toLowerCase() + ".\n\n")}`;

  const copyEmail = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 3000);
    } catch { 
      setCopied(false); 
      setCopyError(true); 
    }
  };

  return (
    <section id="contact" className="section-wrap anime-card contact-layout">
      <div className="contact-copy">
        <span className="manga-eyebrow text-rose-600 flex items-center gap-2 mb-2">
          <MessageSquare size={16} /> お問い合わせ — Contact & Collaborations
        </span>
        <h2>Have an idea?<br />Let's build it.</h2>
        <p>Tell me what you're working on. I'm open to web development projects, full-stack work, and creative collaborations.</p>
        <div className="contact-socials">
          <a href="https://github.com/SantanaDwi29" target="_blank" rel="noreferrer" className="text-link">GitHub <ArrowUpRight size={16} /></a>
          <a href="https://www.linkedin.com/in/i-made-santana-dwiananda/" target="_blank" rel="noreferrer" className="text-link">LinkedIn <ArrowUpRight size={16} /></a>
          <a href="https://www.instagram.com/santanamade" target="_blank" rel="noreferrer" className="text-link">Instagram <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="contact-compose">
        <fieldset>
          <legend>What do you have in mind?</legend>
          <div className="contact-topics">
            {topics.map(item => (
              <button type="button" key={item} aria-pressed={topic === item} onClick={() => setTopic(item)}>
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <a href={href} className="anime-btn-primary">Contact me <Mail size={18} /></a>
        <p className="contact-hint">Opens your email app with the topic ready.</p>
        <div className="contact-address">
          <span>{email}</span>
          <button type="button" className="icon-button" aria-label={copied ? 'Email copied' : 'Copy email address'} onClick={copyEmail}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <p role="status" className="copy-status">
          {copyError ? 'Copy failed. Select the address above to copy it manually.' : copied ? 'Email address copied.' : ''}
        </p>
      </div>
    </section>
  );
};

export default Contact;
