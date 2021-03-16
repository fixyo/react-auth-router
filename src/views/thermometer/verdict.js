import React from 'react'

function Verdict (props) {
  if (props.temperature >= 100) {
    return <h3>the water would be boiled</h3>
  }
  return <h3>the water would not be boiled</h3>
}

export default Verdict