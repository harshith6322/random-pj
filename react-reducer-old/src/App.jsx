import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }
  handleDown() {
    this.setState((currstate) => {
      return { count: currstate.count - 1 };
    });
  }
  handleUp() {
    this.setState((currstate) => {
      return { count: currstate.count + 1 };
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleDown}>-</button>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleUp}>+</button>
      </div>
    );
  }
}
