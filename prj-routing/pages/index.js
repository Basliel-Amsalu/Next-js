import { useEffect, useState } from "react";
import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Nextjs events</title>
        <meta
          name='description'
          content='Find a lot of great events that will allow you to better your self'
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={props.featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1200,
  };
}

export default HomePage;
