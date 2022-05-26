import React from 'react'
import { Container, Title, Text, Button, Group } from '@mantine/core'
import { ReactComponent as Illustration } from '../../../app.shared/app.assets/images/404.svg'
import { useStyles } from './404.styles'
import { useNavigate } from 'react-router-dom'


export const NothingFound = () => {
	const { classes } = useStyles()
	const navigate = useNavigate()

	return (
		<Container className={ classes.root }>
			<div className={ classes.inner }>
				<Illustration className={ classes.image }/>
				<div className={ classes.content }>
					<Title className={ classes.title } color="dimmed">
						Ничего здесь нет
					</Title>
					<Text color="dimmed" size="lg" align="center" className={ classes.description }>
						Страница, которую вы пытаетесь открыть, не существует. Возможно, вы ошиблись при вводе адреса или страница была перемещена по другому URL-адресу. Если вы считаете, что это ошибка, обратитесь в службу поддержки.
					</Text>
					<Group position="center">
						<Button 
							size="md" 
							sx={(theme) => ({
								background: theme.colors.accent[0],
								'&:hover': {
									background: theme.colors.accent[1],
								}
							})}
							onClick={() => navigate('/')}
						>
							А куда...
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	)
}