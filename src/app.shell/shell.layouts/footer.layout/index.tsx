import React, { useMemo } from 'react'
import { Text, Container, ActionIcon, Group } from '@mantine/core'
import { useFooterStyles } from './footer.style'
import { Icon, Microscope } from 'tabler-icons-react'
import { useId } from '@mantine/hooks'
import { NavLink } from 'react-router-dom'


interface FooterLinksProps {
	data: {
		label: string;
		links: {label: string; link: string}[];
	}[];
	socialMedia: {
		icon: Icon;
		link: string;
	}[];
	copyrightText: string;
	tagline: string;
}


export const FooterLinks = ({ data, socialMedia, copyrightText, tagline }: FooterLinksProps) => {

	const { classes } = useFooterStyles()
	const uuid = useId()

	const groups = useMemo(
		() => data.map((group) => {
			const links = group.links.map((link, index) => (
				<Text key={index + uuid} variant="link">
					<NavLink to={link.link} className={classes.link}>
						{link.label}
					</NavLink>
				</Text>
			))

			return (
				<div className={classes.wrapper} key={group.label + uuid}>
					<Text className={classes.title}>{group.label}</Text>
					{links}
				</div>
			)
		}),
		[]
	)

	const SocialMediaLinkItem = ({ link, icon }: {link: string, icon: Icon}) => {
		return <a href={link} target="_blank" rel="noreferrer">
			<ActionIcon size="lg">
				{icon({ size: 18 })}
			</ActionIcon>
		</a>
	}

	const SocialMedia = useMemo(
		() => socialMedia.map(item => <SocialMediaLinkItem key={item.link} {...item}/>),
		[]
	)

	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				<div className={classes.logo}>
					<NavLink to={'/'}>
						<ActionIcon size={'xl'}>
							<Microscope size={36}/>
						</ActionIcon>
					</NavLink>
					<Text size="xs" color="dimmed" className={classes.description}>
						{tagline}
					</Text>
				</div>
				<div className={classes.groups}>{groups}</div>
			</Container>
			<Container className={classes.afterFooter}>
				<Text color="dimmed" size="sm">
					{copyrightText}
				</Text>
				<Group spacing={0} className={classes.social} position="right" noWrap>
					{SocialMedia}
				</Group>
			</Container>
		</footer>
	)
}