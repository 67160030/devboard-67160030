import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
}

export default HomePage;
