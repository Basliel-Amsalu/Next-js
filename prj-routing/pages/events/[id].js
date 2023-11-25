import { useRouter } from "next/router";
import { getEventById } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/UI/error-alert";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const event = getEventById(router.query.id);
  const { event } = props;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No such event</p>
      </ErrorAlert>
    );
  }
  return (
    <>
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
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const event = await getEventById(params.id);

  return {
    props: {
      event,
    },
  };
}

export default EventDetailPage;
