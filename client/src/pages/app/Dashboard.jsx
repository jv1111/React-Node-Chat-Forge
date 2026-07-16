import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  return (
    <section>
      <h2>Dashboard</h2>

      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </section>
  );
};

export default Dashboard;
