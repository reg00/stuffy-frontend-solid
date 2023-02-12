import { notificationService } from '@hope-ui/solid'
import {
  createEffect,
  createResource,
  createSignal,
} from 'solid-js'
import api from '../../../api/api'
import {
  PurchaseUsageShortEntry,
  UpdatePurchaseEntry,
  UpsertPurchaseUsageEntry,
} from '../../../api/__generated__/stuffyHelperApi'
import { NormalizedPurchase } from '../components/EventTable'

type P = {
  eventId: string
}

const useTableState = ({ eventId }: P) => {
  const participantsFetcher = (eventId) =>
    api.participantsList({ eventId }).then((res) => res.data.data)
  const [participants, { refetch: refetchParticipants }] = createResource(
    () => eventId,
    participantsFetcher,
    { initialValue: [] }
  )

  const purchaseFetcher = (eventId) =>
    api.purchasesList({ eventId }).then((res) => res.data.data)
  const [purchases, { refetch: refetchPurchases, mutate: mutatePurchases }] =
    createResource(() => eventId, purchaseFetcher, { initialValue: [] })

  const fetcher = () =>
    api.purchaseUsagesList({ eventId }).then(({ data }) => data.data)
  const [purchaseUsages, { mutate: mutatePurchaseUsages }] = createResource(
    fetcher,
    { initialValue: [] }
  )

  const [normalizedPurchases, setNormalizedPurchases] = createSignal<
    NormalizedPurchase[]
  >([])

  createEffect(() => {
    const newPurchases = purchases().map((purchase) => {
      const cellValues = participants()
        .map((participant) => {
          const purchaseUsage = purchase.purchaseUsages.find(
            (usage) =>
              usage.participantId === participant.id &&
              usage.purchaseId === purchase.id
          )

          return {
            participantId: participant.id,
            value: purchaseUsage?.amount ?? 0,
          }
        })
        .reduce((acc, current) => {
          acc[current.participantId] = current.value
          return acc
        }, {} as Record<string, number>)

      return { ...purchase, cellValues }
    })

    setNormalizedPurchases(newPurchases)
  })

  const addOrUpdatePurchaseUsage = (payload: PurchaseUsageShortEntry): void => {
    mutatePurchaseUsages((oldUsages) => {
      const old = oldUsages.find(
        (usage) => usage.purchaseUsageId === payload.purchaseUsageId
      )

      if (!old) {
        return [...oldUsages, payload]
      }

      return oldUsages.map((oldUsage) => {
        if (payload.purchaseUsageId !== oldUsage.purchaseUsageId)
          return { ...oldUsage }

        return { ...payload }
      })
    })
  }

  const deletePurchaseUsage = (purchaseUsageId): void => {
    mutatePurchaseUsages((oldUsages) =>
      oldUsages.filter((usage) => usage.purchaseUsageId !== purchaseUsageId)
    )
  }

  const patchServer = async (
    rowId: string,
    columnId: string,
    value: number,
    abortController: AbortController
  ) => {
    // OPTIMISTIC UI STUFF
    const purchaseUsage = purchaseUsages().find(
      (usage) => usage.participantId === columnId && usage.purchaseId === rowId
    )

    try {
      if (purchaseUsage) {
        if (value == 0) {
          await api.purchaseUsagesDelete(purchaseUsage.purchaseUsageId, {
            signal: abortController.signal,
          })

          notificationService.show({
            title: 'Клетка удалена успешно',
            status: 'success',
          })

          deletePurchaseUsage(purchaseUsage.purchaseUsageId)

          return
        } else {
          const payload: UpsertPurchaseUsageEntry = {
            purchaseId: rowId,
            participantId: columnId,
            amount: value,
          }

          const { data: newUsage } = await api.purchaseUsagesPartialUpdate(
            purchaseUsage.purchaseUsageId,
            payload,
            {
              signal: abortController.signal,
            }
          )

          notificationService.show({
            title: 'Клетка обновлена успешно',
            status: 'success',
          })

          addOrUpdatePurchaseUsage(newUsage)

          return
        }
      }

      if (value === 0) return

      const payload: UpsertPurchaseUsageEntry = {
        purchaseId: rowId,
        participantId: columnId,
        amount: value,
      }

      const { data: newUsage } = await api.purchaseUsagesCreate(payload, {
        signal: abortController.signal,
      })
      notificationService.show({
        title: 'Клетка создана успешно',
        status: 'success',
      })

      addOrUpdatePurchaseUsage(newUsage)
      return
    } catch (error) {
      // применяем oldValue при ошибке
      // setState('rows', (row) => row.id === rowId, 'cellValues', columnId, value)
    }
  }

  const updatePurchaseUsage = async (
    rowId: string,
    columnId: string,
    value: number
  ) => {
    setNormalizedPurchases((oldPurchases) => {
      return oldPurchases.map((purchase) => {
        if (purchase.id !== rowId) return purchase

        const newCellValues = {
          ...purchase.cellValues,
          [columnId]: value,
        }

        return {
          ...purchase,
          cellValues: newCellValues,
        }
      })
    })
  }

  // purchase actions
  const mutatePurchase = async (rowId: string, value: boolean) => {
    setNormalizedPurchases((oldPurchases) => {
      return oldPurchases.map((purchase) => {
        if (purchase.id !== rowId) return purchase

        return {
          ...purchase,
          isPartial: value,
        }
      })
    })
  }

  const updatePurchase = async (
    purchaseId: string,
    payload: UpdatePurchaseEntry
  ) => {
    const oldValue = normalizedPurchases().find(
      (purchase) => purchase.id === purchaseId
    )
    if (!oldValue) {
      throw new Error(`Не найден purchase с id: ${purchaseId}`)
    }
    mutatePurchase(purchaseId, payload.isPartial)

    try {
      await api.purchasesPartialUpdate(purchaseId, payload)

      notificationService.show({
        title: 'Строка обновлена успешно',
        status: 'success',
      })
    } catch (error) {
      mutatePurchase(purchaseId, payload.isPartial)

      notificationService.show({
        title: 'При обновлении строки произошла ошибка',
        status: 'danger',
      })

      throw error
    }
  }

  return {
    normalizedPurchases,
    participants,
    patchServer,
    updatePurchase,
    updatePurchaseUsage,
  }
}

export default useTableState
