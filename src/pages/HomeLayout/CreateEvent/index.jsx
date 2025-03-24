import Spinner from "../../../components/Spinner";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";
import EventForm from "./components/EventForm";

const CreateEvent = () => {
  const { isLoading, user } = useGetCurrentUser();

  if (isLoading) {
    return <div>
      <Spinner/>
    </div>;
  }

  if (!user) {
    return <h1>Please login to create a Event</h1>;
  }
  return (
    <div>
      <EventForm />{" "}
    </div>
  );
};

export default CreateEvent;
