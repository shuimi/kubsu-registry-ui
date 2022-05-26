import React, { useMemo } from 'react'
import { Icon } from 'tabler-icons-react'
import { useId, useMediaQuery } from '@mantine/hooks'
import { Action, Fab } from 'react-tiny-fab'


interface FabButtonProps {
	root: {
		icon: Icon;
	};
	data: {
		onClick: () => void;
		title: string;
		icon: Icon;
	}[];
}


export const FabButton = ({ root, data }: FabButtonProps) => {

	const uuid = useId()

	const isDesktop = useMediaQuery('(min-width: 960px)')
	const isTablet = useMediaQuery('(min-width: 680px)') && !isDesktop
	const isMobile = !isTablet && !isDesktop

	const Links = useMemo(
		() => data.map(link => (
			<Action key={link.title + uuid} text={link.title} onClick={link.onClick}>
				{link.icon({})}
			</Action>
		)),
		[]
	)

	return <Fab
		style={{
			fontFamily: 'Greycliff CF',
			fontWeight: 500,
			fontStyle: 'normal',
			bottom: isMobile ? '0.8em' : '1.5em',
			right: isMobile ? '0.2em' : '1.5em',
		}}
		event={'click'}
		icon={root.icon({ size: 28 })}
		alwaysShowTitle={true}
	>
		{Links}
	</Fab>


}