import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { getEventRoute } from "..";
import { EventShortEntry } from "../../../api/__generated__/stuffyHelperApi";
import { formatEventDate } from "../../dates";

import './EventCard.css'

const EventCard: Component<EventShortEntry> = ({ id, name, description, eventDateStart, imageUri }) => {
  return (

    <A href={getEventRoute(id)} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" >
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imageUri} alt={name} />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <p>{formatEventDate(eventDateStart)}</p>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </A>
  )
}



export default EventCard