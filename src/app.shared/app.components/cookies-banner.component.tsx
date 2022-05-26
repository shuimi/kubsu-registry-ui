import React from 'react'
import { Button, Paper, Text, Group, CloseButton, Highlight } from '@mantine/core'


export function CookiesBanner () {
	return (
		<Paper withBorder p="lg" radius="md" shadow="md">
			<Group position="apart" mb="xs">
				<Text size='lg' weight={ 500 }>
                    Сиськи!!!
				</Text>
				<CloseButton mr={ -9 } mt={ -9 }/>
			</Group>
			<Text color="dimmed" size="sm">
				<Highlight highlightColor='gray' highlight={['/число', 'роутинг']}>
					А теперь, когда я привлёк ваше внимание, попробуйте в адресную строку добавить /число, чтобы посмотреть,
					как работает роутинг
				</Highlight>
			</Text>
			<Group position="right" mt="xs">
				<Button variant="default" size="xs">
                    Cookies preferences
				</Button>
				<Button variant="outline" size="xs">
                    Accept all
				</Button>
			</Group>
		</Paper>
	)
}