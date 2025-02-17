const useAuth = () => {
    const role = localStorage.getItem("role"); 
    return { role };
  };

  export default useAuth;