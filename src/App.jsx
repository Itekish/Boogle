import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomeLayout/Home";
import Dashboard from "./pages/dashboard";
import Register from "./pages/(auth)/register";
import Login from "./pages/(auth)/login";
import AuthLayout from "./pages/(auth)/authLayout";
import HomeLayout from "./pages/HomeLayout";
import CreateEvent from "./pages/HomeLayout/CreateEvent";
import SingleEvent from "./pages/HomeLayout/singleEvent";
import UpdateEventForm from "./pages/HomeLayout/singleEvent/components/updateEvent";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="create-Event" element={<CreateEvent />} />
        <Route path="event/:eventId" element={<SingleEvent />} />         
        <Route path="event/:eventId/edit" element={<UpdateEventForm/>} />         
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
