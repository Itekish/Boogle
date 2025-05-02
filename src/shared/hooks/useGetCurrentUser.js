import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetCurrentUser = () => {
  const [user, setuser] = useState();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  async function getCurrentUser() {
    setisLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4050/api/v1/users/get-user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setuser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setuser(null);
    navigate("/auth/login");
  }
  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    user,
    isLoading,
    logout,
  };
};
