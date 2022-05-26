import { atom } from 'recoil'


export const UserAuthState = atom<'manager' | 'implementer' | null>({
	key: 'userAuthState',
	default: null,
})