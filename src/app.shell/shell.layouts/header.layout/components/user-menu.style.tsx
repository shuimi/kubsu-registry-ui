import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
		}`,
		marginBottom: 120,
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

	userMenu: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		},
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

}))
