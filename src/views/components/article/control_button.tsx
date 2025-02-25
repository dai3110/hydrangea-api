import React from 'react'

const types = ['edit', 'open', 'close', 'delete'] as const

const Component = (props: { type: (typeof types)[number]; id: number }) => {
  const data: {
    [key in (typeof types)[number]]: {
      href: string
      title: string
      icon: string
    }
  } = {
    edit: {
      href: `/admin/article/${props.id}`,
      title: 'edit',
      icon: 'edit_document'
    },
    open: {
      href: `/admin/publish/open/${props.id}`,
      title: 'publish',
      icon: 'publish'
    },
    close: {
      href: `/admin/publish/close/${props.id}`,
      title: 'change to private',
      icon: 'lock'
    },
    delete: {
      href: `/admin/publish/delete/${props.id}`,
      title: 'delete',
      icon: 'delete'
    }
  }
  return (
    <a href={data[props.type].href} className="material-icons" title={data[props.type].title}>
      {data[props.type].icon}
    </a>
  )
}

export default Component
