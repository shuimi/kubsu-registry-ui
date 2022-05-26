import React from 'react'
import { ActionIcon, Badge, Card, Group, Popover, SimpleGrid, Spoiler, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { Notification, Settings } from 'tabler-icons-react'
import { Link, useNavigate } from 'react-router-dom'


export const Notifications = () => {

	const [ opened, setOpened ] = useState(false)
	const navigate = useNavigate()

	const NotificationButton = <ActionIcon onClick={() => setOpened((o) => !o)}>
		<Notification/>
	</ActionIcon>

	const DATA = [
		{
			title: 'Запланирована конференция',
			description: 'Вы приглашены в конференцию по проекту',
			time: 'Today 2:12',
			link: '/conference/da23wksa2'
		},
		{
			title: 'Notification title',
			description: 'Notification description about this notification',
			time: 'Today 2:12',
			link: '/conference/da23w'
		},
		{
			title: 'Notification title',
			description: 'Notification description about this notification',
			time: 'Today 2:12',
			link: '/conference/sdll'
		},
	]

	const NotificationCard = ({
		title,
		description,
		time,
		link
	}: { title: string, description: string, time: string, link: string }) => {

		const onClick = () => {
			navigate(link)
		}

		return <Card style={{ background: '#323338', cursor: 'pointer' }} onClick={onClick}>
			<Text size={'md'} style={{ lineHeight: '1.4' }}>{title}</Text>
			<Text size={'sm'} style={{ lineHeight: '1.1' }} mt={'xs'}>{description}</Text>
			<Text size={'sm'} style={{ lineHeight: '1.4' }} mt={'xs'}>
				<Badge>
					{time}
				</Badge>
			</Text>
		</Card>
	}

	const onSettingsClick = () => {
		setOpened(false)
		navigate('/settings/notifications')
	}

	const onShowMoreClick = () => {
		setOpened(false)
		navigate('/notifications')
	}

	return <Popover
		opened={opened}
		onClose={() => setOpened(false)}
		target={NotificationButton}
		width={330}
		position="bottom"
		withArrow
	>
		<Group direction={'row'} position={'apart'} mb={'md'} style={{fontFamily: 'Greycliff CF'}}>
			<Group>
				<Title order={4} style={{ color: '#d2d2d2', verticalAlign: 'top' }}>
					Уведомления
				</Title>
				<Text size={'xs'} style={{  color: '#d2d2d2', cursor: 'pointer', verticalAlign: 'bottom' }} onClick={onShowMoreClick}>
					смотреть все
				</Text>
			</Group>
			<ActionIcon onClick={onSettingsClick}>
				<Settings/>
			</ActionIcon>
		</Group>
		<Spoiler maxHeight={140} showLabel="Ещё" hideLabel="">
			<Group direction={'column'} style={{ fontFamily: 'Greycliff CF' }}>
				{DATA.map(notification => <NotificationCard key={notification.link} {...notification}/>)}
			</Group>
		</Spoiler>
	</Popover>
}