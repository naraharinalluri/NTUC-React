import { sleep } from './index'

export interface Centre {
  id: string
  name: string
  location: string
  capacity: number
  currentEnrolment: number
}

const centreStore: Centre[] = [
  {
    id: 'centre-1',
    name: 'Clementi Centre',
    location: 'Clementi',
    capacity: 150,
    currentEnrolment: 128,
  },
  {
    id: 'centre-2',
    name: 'Bedok Centre',
    location: 'Bedok',
    capacity: 120,
    currentEnrolment: 102,
  },
  {
    id: 'centre-3',
    name: 'Jurong Centre',
    location: 'Jurong',
    capacity: 140,
    currentEnrolment: 115,
  },
  {
    id: 'centre-4',
    name: 'Tampines Centre',
    location: 'Tampines',
    capacity: 130,
    currentEnrolment: 98,
  },
  {
    id: 'centre-5',
    name: 'Toa Payoh Centre',
    location: 'Toa Payoh',
    capacity: 110,
    currentEnrolment: 85,
  },
]

export async function getCentres(): Promise<Centre[]> {
  await sleep(300)
  return centreStore
}

export async function getCentreById(id: string): Promise<Centre> {
  await sleep(200)
  const centre = centreStore.find((c) => c.id === id)
  if (!centre) {
    throw new Error('Centre not found')
  }
  return centre
}
