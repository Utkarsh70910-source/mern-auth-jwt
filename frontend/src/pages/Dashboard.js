export default function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{token}</p>
    </div>
  );
}