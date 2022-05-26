import React, { FC, PropsWithChildren } from 'react'
import { useRecoilValue } from 'recoil'
import { AppShell, MantineTheme } from '@mantine/core'
import { NavbarState } from './shell.state'
import {
	BellRinging,
	BrandInstagram,
	BrandTwitter,
	BrandYoutube,
	Notebook, Notification,
	Plus, Polygon, Video,
} from 'tabler-icons-react'
import { FooterLinks, HeaderMenu, NavbarSegmented } from './shell.layouts'
import { FabButton } from './shell.components/fab.component'
import { useNavigate } from 'react-router-dom'
import { UserAuthState } from '../app.shared/app.state'


const Styles = (theme: MantineTheme) => ({
	main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
})

export const Shell: FC<PropsWithChildren<any>> = ({ children }) => {

	const navigate = useNavigate()

	const showNavbar = useRecoilValue(NavbarState)
	const user = useRecoilValue(UserAuthState)

	const logoutCallback = () => console.log('Logout')


	const DATA = user ? [
		{
			label: 'Статьи',
			link: '/publications',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
				{ link: '/add', label: 'Добавление', icon: Plus },
			]
		},
		{
			label: 'Авторы',
			link: '/authors',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
				{ link: '/request', label: 'Подать заявку', icon: BellRinging },
			]
		},
		{
			label: 'Журналы',
			link: '/journals',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
			]
		},
	] : [
		{
			label: 'Статьи',
			link: '/publications',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
			]
		},
		{
			label: 'Авторы',
			link: '/authors',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
				{ link: '/request', label: 'Подать заявку', icon: BellRinging },
			]
		},
		{
			label: 'Журналы',
			link: '/journals',
			links: [
				{ link: '/browse', label: 'Просмотр', icon: BellRinging },
				{ link: '/request', label: 'Подать заявку', icon: BellRinging },
			]
		},
	]

	const Header = <HeaderMenu links={DATA}/>

	const Footer = <FooterLinks
		data={DATA}
		copyrightText='© 2022 QubanTech. All rights reserved.'
		tagline='Лучшее решение для контекстного поиска научных материалов'
		socialMedia={[
			{ link: 'twitter.com', icon: BrandTwitter },
			{ link: 'youtube.com', icon: BrandYoutube },
			{ link: 'instagram.com', icon: BrandInstagram },
		]}
	/>

	const Navbar = showNavbar
		? <NavbarSegmented
			data={DATA}
			logoutCallback={logoutCallback}
			userEmail={'useremail@template.ru'}
			showTabs
		/>
		: undefined

	const FabWidget = user && (showNavbar
		? undefined
		: <FabButton {...{
			root: {
				icon: Polygon,
			},
			data: [
				{
					onClick: () => {
						navigate('/projects')
					},
					icon: Notebook,
					title: 'Проекты'
				},
				{
					onClick: () => {
						navigate('/conferences')
					},
					icon: Video,
					title: 'Конференции'
				},
				{
					onClick: () => {
						navigate('/notifications')
					},
					icon: Notification,
					title: 'Уведомления'
				},
			]
		}}/>) || undefined


	return <AppShell header={Header} aside={Navbar} footer={Footer} styles={Styles} fixed padding={0}>
		{FabWidget}
		{children}
	</AppShell>

}