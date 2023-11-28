import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting started with nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Next js is a react framework for production",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting started with nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Next js is a react framework for production",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting started with nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Next js is a react framework for production",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting started with nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Next js is a react framework for production",
    date: "2022-02-10",
  },
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;