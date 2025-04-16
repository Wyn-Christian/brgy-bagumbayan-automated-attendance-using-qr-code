'use client';

import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { layoutClasses } from './classes';

// ----------------------------------------------------------------------

export function SidebarContainerSection({ children, className, sx, layoutQuery = 'md', ...other }) {
	return (
		<SidebarContainerRoot className={mergeClasses([layoutClasses.sidebarContainer, className])} sx={sx} layoutQuery={layoutQuery} {...other}>
			{children}
		</SidebarContainerRoot>
	);
}

// ----------------------------------------------------------------------

const SidebarContainerRoot = styled('div', {
	shouldForwardProp: (prop) => prop !== 'layoutQuery'
})(({ layoutQuery, theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	[theme.breakpoints.up(layoutQuery)]: {
		paddingLeft: 'var(--layout-nav-vertical-width)',
		transition: `padding-left var(--layout-transition-duration) var(--layout-transition-easing) 0ms`
	}
}));
