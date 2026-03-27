function PostCard({ title, body, isFavorite, onToggleFavorite }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{title}</h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {body}
      </p>

      {/* ปุ่มถูกใจ */}
      <button
        onClick={onToggleFavorite}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          color: isFavorite ? "#e53e3e" : "#a0aec0",
        }}
      >
        {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
      </button>
    </div>
  );
}

export default PostCard;
