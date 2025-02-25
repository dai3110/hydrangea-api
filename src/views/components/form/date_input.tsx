import React from 'react'

const Component = (props: { name: string; value?: Date | null }) => {
  const now = new Date()
  const initialValue = props.value
    ? `${props.value.getFullYear()}-${String(props.value.getMonth() + 1).padStart(2, '0')}-${String(props.value.getDate()).padStart(2, '0')}`
    : null
  return (
    <>
      <input
        type="hidden"
        name={props.name}
        defaultValue={initialValue ?? undefined}
        className="date_input"
      />
      <input
        type="number"
        data-rel-year={props.name}
        min="1990"
        max={now.getFullYear()}
        placeholder="Year"
      />
      <span className="delim" />
      <input type="number" data-rel-month={props.name} min="1" max="12" placeholder="Month" />
      <span className="delim" />
      <input type="number" data-rel-date={props.name} min="1" max="31" placeholder="Date" />
    </>
  )
}

export default Component
