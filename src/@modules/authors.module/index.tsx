import React from 'react'
import { Module } from '../../app.core'
import { Authors } from './authors.module'


export const AuthorsModule = Module(<Authors/>)({
	routeProps: {
		path: '/authors',
	},
	name: 'Authors'
})