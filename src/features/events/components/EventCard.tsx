import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { getEventRoute } from "..";
import { EventShortEntry } from "../../../api/__generated__/stuffyHelperApi";
import { formatEventDate } from "../../dates";

import './EventCard.css'

const EventCard: Component<EventShortEntry> = ({ id, name, description, eventDateStart }) => {

  return (
    <A class="event-card" href={getEventRoute(id)}>
      <div class="event-card__text">
        <div class="event-card__top">
          <h2 class="event-card__title">{name}</h2>
          <div class="event-card__time text-sm">{formatEventDate(eventDateStart)}</div>
        </div>
        <div class="event-card__desc text-sm">
          {description}
        </div>
      </div>
    </A>
  );
};



export default EventCard