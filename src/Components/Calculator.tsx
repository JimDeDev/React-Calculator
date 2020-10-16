import React, { Component, MouseEvent } from 'react';

interface IProps {
}

interface IState {
  screenValue?: string;
}

class Calculator extends Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      screenValue: ''
    }
  }
  
  handleClick = (e: MouseEvent, value: string): void => {

    console.log('state', this.state);
    console.log('value', value);

    // If equals is clicked, evaluate expression and return
    if (value === '=') {
      this.evaluate();
      return;
    }
    
    // If delete is clicked, remove char and return
    if (value === '⌫') {
      this.delete();
      return;
    }
    
    // If All Clear is clicked, clear screen and return
    if (value === 'AC') {
      this.clearAll();
      return;
    }

    this.setState({
      screenValue: this.state.screenValue + value
    })
    
  }
  
  evaluate(): void {

    let expression: string = this.state.screenValue!;

    expression = expression.replaceAll('x', '*');

    try {
      expression = eval(expression);
    }
    catch (error) {
      expression = 'Error';
    }
    finally {
      this.setState({
        screenValue: expression.toString()
      })
    }
  }

  delete(): void {
    this.setState({
      screenValue: this.state.screenValue?.slice(0, -1)
    })

  }

  clearAll = () => {
    this.setState({
      screenValue: ''
    });
 }

  render() {
    const buttonValues: string[] = ['AC', '⌫','(', ')', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '', '0', '.', '='];

    return (
      <div className="calc-container">
        <div className="screen cemter">{this.state.screenValue}</div>
        <div className="buttons-container">

          {buttonValues.map((value, key) => {
            return <button
              key={key}
              className="button"
              onClick={e => this.handleClick(e, value)}>
              {value}</button>;
          })}
        </div>
      </div>
    );
  }
}
export default Calculator;
