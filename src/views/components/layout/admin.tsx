import React from 'react'
import { pathResolved } from '~/utils/app'
import RootLayout from '~/views/components/layout/root'

const AdminLayout = (props: {
  script?: string
  user?: string | null | undefined
  children: React.ReactNode
}) => {
  const jsName = props.script?.split(',').map((s) => s.trim()) ?? []
  return (
    <RootLayout script={props.script}>
      <header className="admin-header">
        <div className="_inner">
          <div className="_main">
            <div className="_logo">
              <span className="material-icons">filter_vintage</span>
              <h1>Hydrangea Admin</h1>
              <span className="material-icons">filter_vintage</span>
            </div>
            <nav className="_navigation">
              <a href={pathResolved('/admin/')} data-icon="list">
                Article List
              </a>
              <a href={pathResolved('/admin/add/photo')} data-icon="article">
                Add Article
              </a>
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
