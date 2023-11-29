import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Someones' Blog</title>
        <meta name='description' content='I post about programming' />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.featuredPosts} />
    </>
  );
};

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts,
    },
  };
}

export default HomePage;
