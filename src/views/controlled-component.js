import React, { Component } from 'react'

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', selected: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('value', event.target.value)
    this.setState({value: event.target.value});
  }

  handleSelect(event) {
    this.setState({
      selected: event.target.value 
    })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          {/* You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly` */}
          <input type="text" value={this.state.value}  onChange={this.handleChange} />
        </label>

        <hr />
        <label>
          Pick your favorite flavor:
          <select value={this.state.selected} onChange={(e) => this.handleSelect(e)}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />

      </form>
    );
  }
}
