import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import "../../dummy-data";
import { getAllEvents } from "../../dummy-data";
const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList events={events} />
    </div>
  );
};

export default AllEventsPage;
