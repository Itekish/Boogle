import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";
import Spinner from "../../../components/Spinner";

const AuthLayout = () => {
  const { isLoading, user } = useGetCurrentUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>
      <Spinner/>
    </div>;
  }
  if (user) {
    return navigate("/dashboard");
  }

  return (
    <div>
      {/* <ul className="flex  gap-5 bg-white/50 py-5 px-5">
        <li>
          <Link to={"/auth"}>Sign Up</Link>
        </li>
        <li>
          <Link to={"/auth/login"}>Login</Link>
        </li>
      </ul> */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
