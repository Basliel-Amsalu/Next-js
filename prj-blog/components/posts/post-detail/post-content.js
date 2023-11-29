import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customComponents = {
    img: ({ node, ...props }) => (
      <div className={classes.image}>
        <Image
          src={`/images/posts/${post.slug}/${props.src}`}
          alt={props.alt}
          width={600}
          height={300}
        />
      </div>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const language = className?.replace("language-", "") || "";

      if (inline) {
        // Render inline code as regular text
        return <code>{children}</code>;
      }

      return (
        <SyntaxHighlighter style={atomDark} language={language} showLineNumbers>
          {String(children).trim()}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
