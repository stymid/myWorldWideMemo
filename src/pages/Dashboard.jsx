import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return <div>Dashboard</div>;
};

export default Dashboard;
