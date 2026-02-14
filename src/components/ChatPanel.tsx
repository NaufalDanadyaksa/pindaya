"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { CulturalObject } from "@/data/culturalObjects";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPanel({ object }: { object: CulturalObject }) {
  const { t, locale } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: `${t.chat.greeting} **${object.name[locale]}**! 🏛️`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<"unknown" | "gemini" | "mock">(
    "unknown",
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Update greeting when language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        id: 1,
        role: "assistant",
        content: `${t.chat.greeting} **${object.name[locale]}**! 🏛️`,
      },
      ...prev.slice(1),
    ]);
  }, [locale, t, object]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          objectName: object.name[locale],
          objectData: {
            description: object.description[locale],
            history: object.history[locale],
            philosophy: object.philosophy[locale],
            culturalMeaning: object.culturalMeaning[locale],
          },
          locale,
          history: messages
            .filter((m) => m.id !== 1)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (data.mode) {
        setChatMode(data.mode === "gemini" ? "gemini" : "mock");
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply || data.error || "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // Fallback if API route itself fails
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          locale === "id"
            ? "Maaf, terjadi kesalahan. Silakan coba lagi."
            : "Sorry, an error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] rounded-2xl glass glow-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-accent/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-secondary">
              {t.result.chat}
            </h3>
            <p className="text-xs text-secondary/40">Online</p>
          </div>
        </div>
        {chatMode !== "unknown" && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-secondary/40">
            <Sparkles className="w-2.5 h-2.5" />
            {chatMode === "gemini" ? "Gemini" : "Demo"}
          </div>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[85%] ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === "user" ? "bg-primary/30" : "bg-accent/20"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3 h-3 text-secondary" />
                  ) : (
                    <Bot className="w-3 h-3 text-accent" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary/30 text-secondary rounded-tr-sm"
                      : "glass-light text-secondary/80 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <Bot className="w-3 h-3 text-accent" />
            </div>
            <div className="glass-light rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex gap-1">
                <span
                  className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-accent/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-secondary placeholder-secondary/30 outline-none focus:ring-1 focus:ring-accent/30 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center text-dark hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
