import { useRouter } from "next/router";
import Head from "next/head";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/UI/error-alert";
import Comments from "../../components/input/comments";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const event = getEventById(router.query.id);
  const { event } = props;
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const event = await getEventById(params.id);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => {
    return {
      params: { id: event.id },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
