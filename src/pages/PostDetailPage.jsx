import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "../components/CommentList";
import LoadingSpinner from "../components/LoadingSpinner";

function PostDetailPage() {
  const { id } = useParams(); // ดึง id จาก URL เช่น /posts/3 → id = "3"
  const { favorites, toggleFavorite } = useFavorites();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
