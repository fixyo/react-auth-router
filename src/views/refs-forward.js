
// import React, { Component } from 'react'
// const FancyButton = React.forwardRef((props, ref) => {
//   console.log('what is ref: ', ref)
//   return (
//   <button ref={ref} className="fancyButton">
//     {props.children}
//   </button>)
// })
// const ref = React.createRef()
// export default class BTN extends Component {
//   render() {
//     return <FancyButton ref={ref}>Click Me!</FancyButton>
//   }
// }


import React, { Component, createRef } from 'react'

export default class Ref extends Component {
  constructor(props) {
    super(props)
    // 2
    // this.titleRef = createRef()

    // 3
    this.titleEle = null 

    //  component
    this.counterRef = createRef() 
  }
  render() {
    return (
      <div>
        {/* 1 */}
        {/* <h2 ref="titleRef">hello react</h2> */}
        {/* 2 */}
        {/* <h2 ref={this.titleRef}>hello react</h2> */}
        {/* 3 */}
        <h2 ref={(ref)=> this.titleEle = ref}>hello react</h2>
        <hr />
        <Counter ref={this.counterRef} />
       
        <button onClick={e => this.changeText()}>change text</button>
      </div>
    )
  }

  changeText() {
    // 1.已被弃用
    // this.refs.titleRef.innerHTML = 'HELLO WORLD'

    // 2.this.titleRef 
    // console.log(this.titleRef.current, 'title')

    // 3
    // console.log(this.titleEle, '3')

    // component 
    // 函数式组件上不能使用ref，因为他们没有属性
    this.counterRef.current.handleAdd()
  }
}

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <>
        <div>当前值：{this.state.count}</div>
        <button onClick={e => this.handleAdd()}>plus one</button>
      </>
    )
  }

  handleAdd() {
    
    this.setState({
      count: this.state.count + 1
    })
  }
}




