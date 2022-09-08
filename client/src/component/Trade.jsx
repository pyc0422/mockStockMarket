import React from 'react';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'buy',
      symbol:'',
      shares: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var value = e.target.value;
    var id = e.target.id;
    if (id==='symbol') {
      this.setState({
        symbol: value
      })
    } else if (id === 'action') {
      this.setState({
        action: value
      })
    } else if (id === 'shares') {
      this.setState({
        shares: value
      })
    }
  }

  handleSubmit(e) {
    const text = {
      symbol: this.state.symbol.toUpperCase(),
      shares: this.state.shares,
      action: this.state.action
    }
    //use fetch to submit to server
    event.preventDefault();
    console.log(text);
    console.log(' is ready to post to server!')
    //submit to server
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          SYMBOL:
          <input type="text" id="symbol" value={this.state.symbol} onChange={this.handleChange}/>
        </label>
        <br/>
        <label>
          ACTION:
          <select value={this.state.action} onChange={this.handleChange} id='action'>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <br/>
        <label>
          Shares:
          <input type="number" id="shares" value={this.state.shares} onChange={this.handleChange}></input>
        </label>
        <br/>

        <input type="submit" value="Submit" />



      </form>

    )
  }
}

export default Trade;