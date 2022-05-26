import React from 'react'
import { createStyles, Text } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


const useStyles = createStyles((theme) => ({
	item: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		borderRadius: theme.radius.md,
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
		padding: `${ theme.spacing.sm }px ${ theme.spacing.xl }px`,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		marginBottom: theme.spacing.sm,
	},

	itemDragging: {
		boxShadow: theme.shadows.sm,
	},

	symbol: {
		fontSize: 30,
		fontWeight: 700,
		width: 60,
	},
}))

interface DndListProps {
    data: {
        position: number;
        mass: number;
        symbol: string;
        name: string;
    }[];
}

export function DndList ({ data }: DndListProps) {

	const { classes, cx } = useStyles()
	const [ state, handlers ] = useListState(data)

	const items = state.map((item, index) => (
		<Draggable
			key={ item.symbol }
			draggableId={ item.symbol }
			index={ index }
		>
			{ (provided, snapshot) => (
				<div
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
					className={ cx(classes.item, { [classes.itemDragging]: snapshot.isDragging }) }
				>
					<Text className={ classes.symbol }>{ item.symbol }</Text>
					<div>
						<Text>{ item.name }</Text>
						<Text color="dimmed" size="sm">
                            Position: { item.position } • Mass: { item.mass }
						</Text>
					</div>
				</div>
			) }
		</Draggable>
	))

	return (
		<DragDropContext
			onDragEnd={ ({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{ (provided) => (
					<div { ...provided.droppableProps } ref={ provided.innerRef }>
						{ items }
						{ provided.placeholder }
					</div>
				) }
			</Droppable>
		</DragDropContext>
	)
}