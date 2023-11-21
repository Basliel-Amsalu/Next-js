import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";

const FilteredEventsPage = () => {
  const router = useRouter();
  console.log(router.query);
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>...Loading</p>;
  }

  const year = filterData[0] * 1;
  const month = filterData[1] * 1;

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 1 || month > 12) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>Invalid Filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents({ year, month });

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
};
export default FilteredEventsPage;
