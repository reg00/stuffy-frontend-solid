import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@hope-ui/solid'
import { A } from '@solidjs/router'
import { Component, createResource, For, onMount } from 'solid-js'
import api from '../api/api'
import { GetDebtEntry } from '../api/__generated__/stuffyHelperApi'
import CreateEvent from '../features/events/components/CreateEvent'
import EventCard from '../features/events/components/EventCard'

type P = {
  debt: GetDebtEntry
}
const DebtCard: Component<P> = ({ debt }) => {
  return (
    <div class="debt-card mt-4">
      <p>Сколько должен: {debt.amount}</p>
      <p>Кто должен: {debt.borrower.name}</p>
      <p>Кому должен: {debt.debtor.name}</p>
    </div>
  )
}

function DebtsPage() {
  // const [events, { refetch }] = createResource(fetcher)

  const debtsFetcher = () =>
    api.debtsList().then((res) => res.data as GetDebtEntry[])

  const [debts, { refetch }] = createResource(debtsFetcher)

  return (
    <div class="w-full p-2">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink currentPage>Долги</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* <p>{JSON.stringify(debts())}</p> */}
      <For each={debts()} fallback={<div>Загрузка...</div>}>
        {(debt) => {
          return <DebtCard debt={debt} />
        }}
      </For>
    </div>
  )
}

export default DebtsPage
