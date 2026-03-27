import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  // ✅ แยก fetch ออกมาเป็น function
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ✅ เรียกตอน mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div style={{ color: "#c53030" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      {/* Header + Reload Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        <h2 style={{ margin: 0 }}>โพสต์ล่าสุด</h2>

        {/* 🔄 Reload Button */}
        <button
          onClick={fetchPosts}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            cursor: "pointer",
            background: "#004471",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
        }}
      />

      {/* No result */}
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* Posts */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
