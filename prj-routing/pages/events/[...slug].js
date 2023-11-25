import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const fetcher = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const FilteredEventsPage = (props) => {
  const [events, setEvents] = useState();
  const router = useRouter();
  console.log(router.query);
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-a0910-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setEvents(transformedData);
    }
  }, [data, error]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content='A list of filtered events' />
    </Head>
  );

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className='center'>...Loading</p>
      </>
    );
  }

  const year = filterData[0] * 1;
  const month = filterData[1] * 1;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`All events for ${year}/${month}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>Invalid Filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  let filteredEvents = events.filter((event) => {
    const date = new Date(event.date);
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
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
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { slug } = context.params;

//   const year = slug[0] * 1;
//   const month = slug[1] * 1;

//   if (isNaN(year) || isNaN(month) || year > 2030 || year < 1 || month > 12) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//     };
//   }

//   let filteredEvents = await getFilteredEvents({ year, month });

//   console.log(filteredEvents);
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year,
//         month,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
