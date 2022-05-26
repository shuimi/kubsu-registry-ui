import React from 'react'
import { Module } from '../../app.core'
import { Profile } from './profile.module'


export const ProfileModule = Module(<Profile/>)({
	routeProps: {
		path: '/profile',
	},
	name: 'Profile'
})