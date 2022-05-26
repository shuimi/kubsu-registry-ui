import React, { useMemo } from 'react'
import { Header, Menu, Group, Center, Burger, Container, Button, ActionIcon } from '@mantine/core'
import { ChevronDown, Microscope } from 'tabler-icons-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { NavbarState } from '../../shell.state'
import { useId, useScrollLock } from '@mantine/hooks'
import { useHeaderStyles } from './header.style'
import { UserAuthState } from '../../../app.shared/app.state'
import { UserMenu } from './components/user-menu.component'
import { Notifications } from '../../shell.components/notifications.component'


interface HeaderSearchProps {
	links: {
		link: string;
		label: string;
		links?: {link: string; label: string}[]
	}[];
}


export const HeaderMenu = ({ links }: HeaderSearchProps) => {

	const auth = useRecoilValue(UserAuthState)
	const [ show, toggleShow ] = useRecoilState(NavbarState)

	const [ scrollLocked, setScrollLocked ] = useScrollLock()
	const { classes } = useHeaderStyles()
	const uuid = useId()

	const navigate = useNavigate()

	const menuItems = useMemo(
		() => links.map((link) => {

			const nestedMenuItems = link.links?.map((item) => (
				<NavLink key={link.link + item.link + uuid} to={link.link + item.link}>
					<Menu.Item>
						{item.label}
					</Menu.Item>
				</NavLink>
			))

			return nestedMenuItems?.length == 1
				?
				<Menu key={link.label + uuid} trigger="hover" delay={0} transitionDuration={0} placement="end" gutter={1} control={
					<NavLink to={link.link} className={classes.link}>
						<Center>
							<span className={classes.linkLabel}>{link.label}</span>
							<ChevronDown size={12}/>
						</Center>
					</NavLink>
				}>
					{nestedMenuItems}
				</Menu>
				:
				<NavLink key={link.label + uuid} to={link.link} className={classes.link}>
					{link.label}
				</NavLink>
		}),
		[links]
	)

	const toggleNavbar = () => {
		toggleShow(() => !show)
		setScrollLocked(() => !scrollLocked)
	}

	const onLogin = () => {
		navigate('login')
	}

	return <Header fixed height={56}>
		<Container>
			<div className={classes.inner}>
				<NavLink to={'/'}>
					<ActionIcon size={'xl'}>
						<Microscope size={36}/>
					</ActionIcon>
				</NavLink>
				<Group spacing={5} className={classes.links}>
					{menuItems}
					{
						auth && <Notifications/>
					}
					{
						auth
						&& <UserMenu/>
						|| <Button variant={'outline'} color={'gray'} onClick={onLogin}>
							Войти
						</Button>
					}
				</Group>
				<Burger opened={show} onClick={toggleNavbar} className={classes.burger} size="sm"/>
			</div>
		</Container>
	</Header>
}