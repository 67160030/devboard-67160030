import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import PostCount from "./PostCount";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // 🔥 แยก logic fetch ออกมา
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

  // โหลดครั้งแรก
  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      {/* 🔥 Header + ปุ่มโหลดใหม่ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
          }}
        >
          โพสต์ล่าสุด
        </h2>

        <button
          onClick={fetchPosts}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "none",
            background: "#1e40af",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <PostCount count={filtered.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
