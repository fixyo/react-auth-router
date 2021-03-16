import React, { Component } from 'react'

export default class TemperatureInput extends Component {

  render() {
    const { scale, value } = this.props
    
    return (
      <fieldset>
        <legend>Enter temperature in {scale} :</legend>  
        <input value={value} onChange={(e) => this.handleChange(scale, e) } />
      </fieldset>
    )
  }

  handleChange(scale, e) {
    const { onTemperateChange } = this.props
    onTemperateChange({scale, temperature: e.target.value})
  }
}
