'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import LinkWrapper from '../common/LinkWrapper'
import { useAppStore } from '@/stores/app.store'
import { AppPagePaths } from '@/enums'
import { InterfaceAppLink } from '@/interfaces'

export default function HeaderButton(props: { pagePath: AppPagePaths; disabled?: boolean }) {
    const { links } = useAppStore()
    const pathname = usePathname()
    const isCurrentPath = () => {
        if (props.pagePath === '/') return pathname === props.pagePath
        else return pathname.startsWith(props.pagePath)
    }
    let link: undefined | InterfaceAppLink = undefined
    for (let linkIndex = 0; linkIndex < links.length && !link; linkIndex++) {
        if (links[linkIndex].path === props.pagePath) link = links[linkIndex]
        for (let sublinkIndex = 0; sublinkIndex < links[linkIndex].sublinks.length && !link; sublinkIndex++) {
            if (links[linkIndex].sublinks[sublinkIndex].path === props.pagePath) link = links[linkIndex].sublinks[sublinkIndex]
        }
    }

    // html
    if (!link) return null
    if (!link.enabled) return null
    return (
        <LinkWrapper
            href={props.disabled ? pathname : props.pagePath}
            className={cn('z-50 rounded-md px-2 min-w-8 text-center sm:px-2.5 py-0.5 hover:bg-light-hover bg-opacity-50 flex items-center', {
                'bg-light-hover': isCurrentPath(),
            })}
        >
            <p className={cn({ 'text-primary': isCurrentPath(), 'text-inactive': !isCurrentPath() })}>{link?.name ?? 'Not found'}</p>
        </LinkWrapper>
    )
}
