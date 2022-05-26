import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CommonModules } from '../@modules'


export const RouterRoot = () => {

	return <Routes>
		{ CommonModules.map(module => <Route {...module.routeProps} key={module.name}/>) }
	</Routes>
}
