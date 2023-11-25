import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import "../../dummy-data";
import Head from "next/head";
import { getAllEvents } from "../../helpers/api-utils";
const AllEventsPage = (props) => {
  const router = useRouter();

  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <Head>
        <title>All events</title>
        <meta
          name='description'
          content='Find a lot of great events that will allow you to better your self'
        />
      </Head>
      <EventsSearch onSearch={onSearch} />
      <EventList events={props.events} />
    </>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
