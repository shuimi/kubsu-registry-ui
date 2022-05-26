import React from 'react'
import { NothingFoundPage } from './404.module'
import { Module } from '../../app.core'


export const NothingFoundModule = Module(<NothingFoundPage/>)({
	routeProps: {
		path: '*',
	},
	name: 'Nothing found'
})