import React from 'react'
import './style.scss'

interface Props {

}

const Grid: React.FC<Props> = () => {
  return (
    <>
      <span className="stroke stroke-vert"></span>
      <span className="stroke stroke-horiz"></span>
      <span className="stroke stroke-diag-right"></span>
      <span className="stroke stroke-diag-left"></span>
    </>
  )
}

export default Grid
