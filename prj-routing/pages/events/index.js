import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import "../../dummy-data";
import { getAllEvents } from "../../dummy-data";
const AllEventsPage = (props) => {
  const router = useRouter();

  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList events={props.events} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
    "https://nextjs-a0910-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = Object.keys(data).map((key) => ({
    id: key,
    title: data[key].title,
    description: data[key].description,
    date: data[key].date,
    location: data[key].location,
    image: data[key].image,
    isFeatured: data[key].isFeatured,
  }));

  return {
    props: {
      events: transformedEvents,
    },
  };
}

export default AllEventsPage;
