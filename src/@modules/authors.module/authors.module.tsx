import React, { ReactNode } from 'react'
import { Badge, Center, Container, Input, Loader, Pagination } from '@mantine/core'
import { $api, useResource } from '../../app.core/api.core'
import { Table, Group, Text, ActionIcon, Menu, ScrollArea } from '@mantine/core'
import { Pencil, Messages, Note, ReportAnalytics, Trash, Search, ArrowRight } from 'tabler-icons-react'
import { Author, AuthorCreateDto } from '../../app.shared/app.models'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


interface UsersStackProps {
    data: {
        id: number;
        fullName: string;
        disciplines: string[];
        birthDate: string;
        address: string;
        status: string;
        bio: string;
        amountOfArticles: number;
        journalNames: string[];
    }[];
    isFetching: boolean;
}


export function UsersStack({ data, isFetching }: UsersStackProps) {

	const navigate = useNavigate()

	const statusTitle = (status: string) =>
		status === 'APPROVED' ? 'Активен' :
			status === 'CANCELLED' ? 'Отклонено' :
				status === 'PENDING' ? 'Заявка' : ''

	const getColumn = (title: string, value: ReactNode) => <td>
		<Group grow direction={'column'} spacing="xs">
			<Text size="md" weight={500}>
				{value}
			</Text>
			<Text color="dimmed" size="sm">
				{title}
			</Text>
		</Group>
	</td>


	const rows = data.map((item) => {

		const StatusBadge = <Group>
			<Badge sx={(theme) => ({
				background: theme.colors.accent[0],
				color: theme.white
			})}
				   size={'sm'}
				   my={5}
			>
				<Text size={'xs'} weight={600}>
					{statusTitle(item.status)}
				</Text>
			</Badge>
		</Group>

		const Disciplines = <Group spacing={'xs'}>
			{
				item.disciplines.map(discipline =>
					<Badge key={discipline} sx={(theme) => ({
						background: theme.colors.accent[0],
						color: theme.white
					})}
						   size={'sm'}
						   my={5}
					>
						<Text size={'xs'} weight={500}>
							{discipline}
						</Text>
					</Badge>
				)
			}
		</Group>

		const Tr = styled.tr`{
			&:hover {
				background: #f3f3f3;
			}
		}`

		return <Tr key={item.id}>
			<td onClick={() => navigate(`${item.id}`)}>
				<ActionIcon>
					<ArrowRight/>
				</ActionIcon>
			</td>
			{getColumn('Полное имя', item.fullName)}
			{getColumn('Статус', StatusBadge)}
			{getColumn('Адрес', item.address)}
			{getColumn('Статей', item.amountOfArticles)}
			{getColumn('Дисциплины', Disciplines)}
			<td>
				<Group spacing={0} position="right">
					<ActionIcon>
						<Pencil size={16}/>
					</ActionIcon>
					<Menu transition="pop" withArrow placement="end">
						<Menu.Item icon={<Messages size={16}/>}>Send message</Menu.Item>
						<Menu.Item icon={<Note size={16}/>}>Add note</Menu.Item>
						<Menu.Item icon={<ReportAnalytics size={16}/>}>Analytics</Menu.Item>
						<Menu.Item icon={<Trash size={16}/>} color="red">
                                Terminate contract
						</Menu.Item>
					</Menu>
				</Group>
			</td>
		</Tr>

	})

	return (
		<ScrollArea>
			<Table sx={{ minWidth: 800 }} verticalSpacing="md">
				<tbody>
					{
						isFetching
                    && <Loader/>
                    || rows
					}
				</tbody>
			</Table>
		</ScrollArea>
	)
}

export const Authors = () => {

	const authors = useResource<Author, AuthorCreateDto>(
		'http://localhost:5000/authors', $api, {
			pagination: {
				items: 5,
				page: 0
			},
		}
	)

	const AuthorsList = <UsersStack
		data={
			authors.data?.rows.map(author => ({
				id:
                author.id,
				fullName:
                    `${author.profile.firstName} ${author.profile.lastName}`,
				disciplines:
                    [ 'Machine Learning', 'Data Science' ],
				birthDate:
                    new Date(author.profile.birthDate).toLocaleDateString('ru-RU'),
				address:
                    `${author.profile.country}, ${author.profile.region}, ${author.profile.address}`,
				status:
                author.status,
				bio:
                author.bio,
				amountOfArticles:
                author.publications.length,
				journalNames:
                    author.journals.map(journal => journal.name)
			})) || []
		}
		isFetching={authors.state.isFetching}
	/>

	return (
		<Container>
			<Input
				my={'md'}
				icon={<Search/>}
				variant="filled"
				placeholder="Введите запрос"
				radius="xl"
				size="md"
				value={authors.state.search.searchQuery}
				onInput={(event: any) => authors.state.search.setSearchQuery(event.target.value)}
			/>
			{
				authors.state.error
			}
			{
				authors.state.isFetching
                && <Loader/>
                || AuthorsList
			}
			<Center mt={'md'}>
				<Pagination
					color={'teal'}
					withControls={false}
					total={authors.state.pagination.totalPages}
					page={authors.state.pagination.page + 1}
					onChange={(page) => authors.state.pagination.setPage(page - 1)}
				/>
			</Center>
		</Container>
	)
}

