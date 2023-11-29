import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All my posts</title>
        <meta
          name='description'
          content='A list of all programming related materials'
        />
      </Head>
      <AllPosts posts={props.allPosts} />;
    </>
  );
};

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts,
    },
  };
}

export default AllPostsPage;
