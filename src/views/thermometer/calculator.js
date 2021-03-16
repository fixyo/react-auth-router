import React, { Component } from 'react'
import Verdict from './verdict'
import TemperatureInput from './temperatureInput'

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: 'F',
      temperature: '0'
    }
  }
  render() {
    const cTof = (c) => {
      if (!c) return ''
      return + c + 21 + ''
    }
    const fToc = (f) => {
      if (!f) return ''
      return + f - 21 + ''
    }
    const { scale, temperature } = this.state 
    const cValue = scale === 'C' ? temperature : fToc(temperature)
    const fValue = scale === 'F' ? temperature : cTof(temperature)

    return (
      <div>
        <TemperatureInput 
          scale="C" 
          onTemperateChange={(obj) => this.onTemperateChange(obj)} 
          value={cValue}
        ></TemperatureInput>
        <TemperatureInput 
          scale='F' 
          onTemperateChange={(obj) => this.onTemperateChange(obj)} 
          value={fValue}
        ></TemperatureInput>
        <Verdict temperature={cValue}></Verdict>
      </div>
    )
  }
  onTemperateChange(obj) {
    const { scale, temperature } = obj 

    this.setState({
      scale,
      temperature
    })
  }
}
