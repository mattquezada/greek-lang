export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      {/* Eleni avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: '#0D5EAF' }}
      >
        Ε
      </div>
      <div
        className="flex items-center gap-1 rounded-2xl px-4 py-3"
        style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
        <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
      </div>
      <style>{`
        .typing-dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #0D5EAF;
          animation: typingBounce 0.9s ease-in-out infinite;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
