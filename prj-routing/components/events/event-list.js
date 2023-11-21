import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = (props) => {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
