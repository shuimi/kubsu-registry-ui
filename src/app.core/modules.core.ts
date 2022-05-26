import * as React from 'react'


export interface ModuleProps {
    routeProps: {
        path: string,
        exact?: boolean,
        index?: boolean,
    };
    name: string;
}

export interface ModuleDescriptor {
    routeProps: {
        path: string,
        exact?: boolean,
        index?: boolean,
        element: React.ReactNode | null,
    };
    name: string;
}

type DescriptorFactory = (props: ModuleProps) => ModuleDescriptor


export const Module = (moduleRoot: React.ReactNode | null): DescriptorFactory => {
	return ({ routeProps, name }): ModuleDescriptor => ({
		routeProps: {
			...routeProps,
			element: moduleRoot
		},
		name: name
	})
}
