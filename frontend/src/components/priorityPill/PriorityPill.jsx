// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./priorityPill.css"
import { FormattedMessage } from 'react-intl'
export default function PriorityPill({ priority }) {

  return (
    <div className={priority.name} style={{ width: 'fit-content' }}>
      <FormattedMessage id={priority.name}/>
    </div>
  )
}
