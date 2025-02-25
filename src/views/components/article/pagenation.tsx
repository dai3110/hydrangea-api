import React from 'react'
import { postsPerPage } from '~/const/app'

const Component = (props: { page: number; total: number; type: string }) => {
  return (
    <ul className="article-pagenation">
      {(props.page ?? 1) === 1 ? (
        <li className="_here">{1}</li>
      ) : (
        <li className="_link">
          <a href={`/admin/list/${props.type}/1`}>{1}</a>
        </li>
      )}
      {(props.page ?? 1) > 3 && <li className="_ellips"></li>}
      {(props.page ?? 1) > 2 && (
        <li className="_link">
          <a href={`/admin/list/${props.type}/${props.page! - 1}`}>{props.page! - 1}</a>
        </li>
      )}
      {(props.page ?? 1) !== 1 &&
        (props.page ?? 1) !== Math.ceil(props.total / postsPerPage) && (
          <li className="_here">{props.page}</li>
        )}
      {(props.page ?? 1) < Math.ceil(props.total / postsPerPage) - 1 && (
        <li className="_link">
          <a href={`/admin/list/${props.type}/${props.page! + 1}`}>{props.page! + 1}</a>
        </li>
      )}
      {(props.page ?? 1) < Math.ceil(props.total / postsPerPage) - 2 && (
        <li className="_ellips"></li>
      )}
      {Math.ceil(props.total / postsPerPage) !== 1 &&
        ((props.page ?? 1) === Math.ceil(props.total / postsPerPage) ? (
          <li className="_here">{Math.ceil(props.total / postsPerPage)}</li>
        ) : (
          <li className="_link">
            <a href={`/admin/list/${props.type}/${Math.ceil(props.total / postsPerPage)}`}>
              {Math.ceil(props.total / postsPerPage)}
            </a>
          </li>
        ))}
    </ul>
  )
}

export default Component
