import React from 'react'
import { Module } from '../../app.core'
import { Journals } from './journals.module'


export const JournalsModule = Module(<Journals/>)({
	routeProps: {
		path: '/journals',
	},
	name: 'Journals'
})