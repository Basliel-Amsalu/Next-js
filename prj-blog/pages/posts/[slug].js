import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const PostDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </>
  );
};

export function getStaticProps(context) {
  const { params } = context;
  const post = getPostData(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostFiles();
  let slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
export default PostDetailPage;
