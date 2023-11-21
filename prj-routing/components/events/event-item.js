import Link from "next/link";
import classes from "./event-item.module.css";

const EventItem = (props) => {
  const readableDate = new Date(props.event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let address;
  if (props.event.location) {
    address = props.event.location.replace(",", "\n");
  }
  const exploreLink = `/events/${props.event.id}`;
  return (
    <li className={classes.item}>
      <img src={"/" + props.event.image} alt={props.event.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.event.title}</h2>
          <div className={classes.date}>
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{address}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
