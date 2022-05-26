import React from 'react'
import { About } from './about.module'
import { Module } from '../../app.core'


export const AboutModule = Module(<About/>)({
	routeProps: {
		path: '/',
	},
	name: 'About'
})