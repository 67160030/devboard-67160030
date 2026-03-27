function Navbar({ favoriteCount }) {
  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          กระดานนักพัฒนา
        </p>
      </div>

      {favoriteCount > 0 && (
        <div
          style={{
            background: "#e53e3e",
            borderRadius: "20px",
            padding: "0.25rem 0.75rem",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          ❤️ {favoriteCount} ถูกใจ
        </div>
      )}
    </nav>
  );
}

export default Navbar;