import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";

const INITIAL_POSTS = [
  {
    id: 1,
    title: "React คืออะไร?",
    body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้",
  },
  {
    id: 2,
    title: "ทำไมต้องใช้ Components?",
    body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้",
  },
  {
    id: 3,
    title: "JSX คืออะไร?",
    body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก",
  },
  {
    id: 4,
    title: "Props ทำงานอย่างไร?",
    body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน",
  },
];

const USERS = [
  { id: 1, name: "สมชาย ใจดี", email: "somchai@dev.com" },
  { id: 2, name: "สมหญิง รักเรียน", email: "somying@dev.com" },
  { id: 3, name: "วิชาญ โค้ดเก่ง", email: "wichan@dev.com" },
];

function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [favorites, setFavorites] = useState([]); // เก็บ id ที่ถูกใจ

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  // เพิ่มโพสต์ใหม่
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]); // เพิ่มไว้ด้านบน
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={handleAddPost} />
          <PostList
            posts={posts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
        <div>
          <h2
            style={{
              color: "#2d3748",
              borderBottom: "2px solid #1e40af",
              paddingBottom: "0.5rem",
            }}
          >
            สมาชิก
          </h2>
          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;