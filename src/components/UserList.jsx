import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch {
        // ไม่แสดง error ในตัวอย่างนี้ (นักศึกษาลองเพิ่มเองได้)
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
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
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
