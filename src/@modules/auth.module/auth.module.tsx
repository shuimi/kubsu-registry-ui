import { upperFirst, useForm, useToggle } from '@mantine/hooks'
import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Divider,
	Group,
	Paper,
	Text,
	PasswordInput,
	TextInput
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Abacus } from 'tabler-icons-react'
import React from 'react'

export const Auth = () => {

	const navigate = useNavigate()
	const [ type, toggle ] = useToggle('войти', [ 'войти', 'зарегистрироваться' ])

	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
			terms: true,
		},

		validationRules: {
			email: (val) => /^\S+@\S+$/.test(val),
			password: (val) => val.length >= 6,
		},
	})


	const onAdminAuth = () => {
		// TODO: do login
		navigate('/')
	}


	return (
		<Container mt={'lg'} style={{ maxWidth: '480px' }}>
			<Paper radius="md" p="xl" withBorder>
				<Text size="lg" weight={500}>
                    Добро пожаловать! Войти как
				</Text>

				<Group grow mb="md" mt="md" direction={'column'}>
					<Button
						radius="xl"
						size="md"
						onClick={onAdminAuth}
						color={'gray'}
						leftIcon={<Abacus/>}
					>
						Администратор
					</Button>
				</Group>

				<Divider label="Или войти по email" labelPosition="center" my="lg"/>

				<form onSubmit={form.onSubmit(() => {
					return
				})}>
					<Group direction="column" grow>
						{type === 'зарегистрироваться' && (
							<TextInput
								label="Имя"
								placeholder="Ваше имя"
								value={form.values.name}
								onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
							/>
						)}

						<TextInput
							required
							label="Адрес электронной почты"
							placeholder="example@mail.ru"
							value={form.values.email}
							onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
							error={form.errors.email && 'Invalid email'}
						/>

						<PasswordInput
							required
							label="Пароль"
							placeholder="Ваш пароль"
							value={form.values.password}
							onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
							error={form.errors.password && 'Пароль должен быть как минимум из 6 символов'}
						/>

						{type === 'зарегистрироваться' && (
							<Checkbox
								label="Я принимаю соглашения"
								checked={form.values.terms}
								onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
							/>
						)}
					</Group>
					<Group position="apart" mt="xl">
						<Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
							{type === 'зарегистрироваться'
								? 'Уже есть аккаунт? Войти'
								: 'Ещё нет аккаунта? Зарегистрироваться'}
						</Anchor>
						<Button type="submit" sx={(theme) => ({
							background: theme.colors.accent[0],
							'&:hover': {
								background: theme.colors.accent[1],
							}
						})}>
							{upperFirst(type)}
						</Button>
					</Group>
				</form>
			</Paper>
		</Container>
	)
}