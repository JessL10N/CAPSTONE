const useAuth = () => {
    const role = localStorage.getItem("role"); 
    return { role };
  };

  export default useAuth;

  //DA USARE NEI SINGOLI COMPONENTI
  /*import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "admin" && <button>Aggiungi Corso</button>}
    </div>
  );
};*/