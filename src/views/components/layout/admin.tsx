import React from 'react'
import { pathResolved } from '~/utils/app'
import RootLayout from '~/views/components/layout/root'

const AdminLayout = (props: {
  script?: string
  css?: string
  user?: string | null | undefined
  children: React.ReactNode
}) => {
  const jsName = props.script?.split(',').map((s) => s.trim()) ?? []
  return (
    <RootLayout script={props.script} css={props.css}>
      <header className="admin-header">
        <div className="_inner">
          <div className="_main">
            <div className="_logo">
              <span className="material-icons">filter_vintage</span>
              <h1>Hydrangea Admin</h1>
              <span className="material-icons">filter_vintage</span>
            </div>
            <nav className="_navigation">
              <span className="_group">
                <span data-icon="list">Article (</span>
                <a href={pathResolved('/admin/list/all/')}>all</a>/
                <a href={pathResolved('/admin/list/draft/')}>draft</a>/
                <a href={pathResolved('/admin/list/private/')}>private</a>/
                <a href={pathResolved('/admin/list/public/')}>public</a>
                <span>)</span>
              </span>
              <span className="_group">
                <a href={pathResolved('/admin/add/photo')} data-icon="article">
                  Add Article
                </a>
              </span>
            </nav>
          </div>
          <nav className="_users">
            {props.user && <span data-icon="user">{props.user}</span>}
            <a href={pathResolved('/admin/logout')} data-icon="logout">
              logout
            </a>
          </nav>
        </div>
      </header>
      <main>{props.children}</main>
    </RootLayout>
  )
}

export default AdminLayout
