import { atom } from 'jotai'

type ViewMode = 'total' | 'juniors' | 'working' | 'old'

export const viewmodeAtom = atom<ViewMode>('total')
