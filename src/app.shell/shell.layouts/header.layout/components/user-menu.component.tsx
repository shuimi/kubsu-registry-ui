import React, { useState } from 'react'
import {
	Avatar,
	UnstyledButton,
	Group,
	Text,
	Menu,
	Divider,
} from '@mantine/core'
import {
	Logout,
	Star,
	Message,
	Settings,
	ChevronDown,
	Notification,
} from 'tabler-icons-react'
import { useStyles } from './user-menu.style'
import { useRecoilState } from 'recoil'
import { UserAuthState } from '../../../../app.shared/app.state'
import { useNavigate } from 'react-router-dom'



export const UserMenu = () => {

	const [ , setAuth ] = useRecoilState(UserAuthState)
	const navigate = useNavigate()

	const { classes, theme, cx } = useStyles()
	const [userMenuOpened, setUserMenuOpened] = useState(false)


	const onLogout = () => {
		setAuth(null)
		navigate('/')
	}

	return <Menu
		size={260}
		placement="end"
		transition="pop-top-right"
		className={classes.userMenu}
		onClose={() => setUserMenuOpened(false)}
		onOpen={() => setUserMenuOpened(true)}
		control={
			<UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
				<Group spacing={7}>
					<Avatar
						src={'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'}
						alt={'Иванов И.И.'} radius="xl" size={20} />
					<Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
						Иванов И.И.
					</Text>
					<ChevronDown size={12} />
				</Group>
			</UnstyledButton>
		}
	>
		<Menu.Item icon={<Notification size={14} color={theme.colors.red[6]}/>} onClick={() => navigate('/notifications')}>
			Уведомления
		</Menu.Item>
		<Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />} onClick={() => navigate('/projects')}>
			Проекты
		</Menu.Item>
		<Menu.Item icon={<Message size={14} color={theme.colors.blue[6]}/>} onClick={() => navigate('/conferences')}>
			Конференции
		</Menu.Item>
		<Divider />
		<Menu.Label>Настройки</Menu.Label>
		<Menu.Item icon={<Settings size={14} />} onClick={() => navigate('/settings')}>
			Настройки аккаунта
		</Menu.Item>
		<Menu.Item icon={<Logout size={14} />} onClick={onLogout}>
			Выйти
		</Menu.Item>
	</Menu>

}