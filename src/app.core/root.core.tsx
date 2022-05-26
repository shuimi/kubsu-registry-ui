import React from 'react'
import { RecoilRoot } from 'recoil'
import { Global, MantineProvider, MantineThemeOverride } from '@mantine/core'

import { Shell } from '../app.shell'
import { RouterRoot } from './index'
import { BrowserRouter } from 'react-router-dom'

import fontRegular from './../app.shared/app.assets/fonts/GreycliffCF-Regular.woff2'
import fontMedium from './../app.shared/app.assets/fonts/GreycliffCF-Medium.woff2'
import fontDemiBold from './../app.shared/app.assets/fonts/GreycliffCF-DemiBold.woff2'
import fontBold from './../app.shared/app.assets/fonts/GreycliffCF-Bold.woff2'
import fontHeavy from './../app.shared/app.assets/fonts/GreycliffCF-Heavy.woff2'
import { NotificationsProvider } from '@mantine/notifications'


const MANTINE_DEFAULT_PROPS = {
	Container: {
		sizes: {
			md: 1120,
		},
	},
}


const MANTINE_THEME: MantineThemeOverride = {
	fontFamily: 'Greycliff CF',
	colorScheme: 'light',
	colors: {
		accent: ['#40ba9b', '#318f78']
	},
}


const GLOBAL_STYLES = [
	{
		'@font-face': {
			fontFamily: 'Greycliff CF',
			src: `url('${fontRegular}') format("woff2")`,
			fontWeight: 400,
			fontStyle: 'normal',
		},
	},
	{
		'@font-face': {
			fontFamily: 'Greycliff CF',
			src: `url('${fontMedium}') format("woff2")`,
			fontWeight: 500,
			fontStyle: 'normal',
		},
	},
	{
		'@font-face': {
			fontFamily: 'Greycliff CF',
			src: `url('${fontDemiBold}') format("woff2")`,
			fontWeight: 600,
			fontStyle: 'normal',
		},
	},
	{
		'@font-face': {
			fontFamily: 'Greycliff CF',
			src: `url('${fontBold}') format("woff2")`,
			fontWeight: 700,
			fontStyle: 'normal',
		},
	},
	{
		'@font-face': {
			fontFamily: 'Greycliff CF',
			src: `url('${fontHeavy}') format("woff2")`,
			fontWeight: 900,
			fontStyle: 'normal',
		},
	},
]


export const Root = () => {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Global styles={GLOBAL_STYLES}/>
				<MantineProvider theme={MANTINE_THEME} defaultProps={MANTINE_DEFAULT_PROPS}>
					<NotificationsProvider>
						<Shell>
							<RouterRoot/>
						</Shell>
					</NotificationsProvider>
				</MantineProvider>
			</BrowserRouter>
		</RecoilRoot>
	)
}
