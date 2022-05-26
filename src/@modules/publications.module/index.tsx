import React from 'react'
import { Module } from '../../app.core'
import { Publications } from './publications.module'


export const PublicationsModule = Module(<Publications/>)({
	routeProps: {
		path: '/publications',
	},
	name: 'Publications'
})