export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Property Buyer Connection
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        The site is installed and running on Vercel.
      </p>

      <p style={{ fontSize: "16px" }}>
        Next step: Go to{" "}
        <a href="/founder" style={{ color: "blue" }}>
          /founder
        </a>{" "}
        to continue setup.
      </p>
    </main>
  );
}
