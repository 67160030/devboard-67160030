function PostCard({ title, body }) {
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
      <p style={{ margin: 0, color: "#4a5568", lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

export default PostCard;