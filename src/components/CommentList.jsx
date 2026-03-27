import { useState, useEffect } from "react";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );

        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");

        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (postId) fetchComments();
  }, [postId]);

  if (loading) return <p>กำลังโหลดความคิดเห็น...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: "1rem" }}>
      <strong>ความคิดเห็น ({comments.length})</strong>

      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f7fafc",
            padding: "0.5rem",
            marginTop: "0.5rem",
            borderRadius: "6px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>{comment.name}</div>
          <div>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
