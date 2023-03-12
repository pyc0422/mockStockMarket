import React from 'react';
const initState = {
  action: 'buy',
  symbol:'',
  shares: 0
};
class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
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
    const content = {
      symbol: this.state.symbol.toUpperCase(),
      shares: parseInt(this.state.shares),
      action: this.state.action,
      user_id: this.props.user.id,
      cash: this.props.user.cash
    }
    if (this.state.action === 'sell') {
      content.shares = -content.shares;
    }
    event.preventDefault();
    //console.log(content, ' is ready to post to server!')
    //submit to server
    this.props.trade(content)
      .then(() => {
        console.log('trade finished');
        this.setState(initState);
      })

  }

  render() {
    return (
      <div style={{fontWeight:600, width:'50%', margin:'auto'}}>
        <h3>TRADE STOCKS</h3>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-row">
            <label>SYMBOL:</label>
            <input type="text" id="symbol" value={this.state.symbol} onChange={this.handleChange}/>
          </div>
          <div className="form-row">
            <label>ACTION:</label>
            <select style={{width:'11em'}} value={this.state.action} onChange={this.handleChange} id='action'>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>

          </div>
          <div className="form-row">
            <label>Shares:</label>
            <input type="number" id="shares" value={this.state.shares} onChange={this.handleChange}></input>
          </div>
          <input style={{marginTop:'5%'}} className='btn' type="submit" value="Submit" />
        </form>
      </div>


    )
  }
}

export default Trade;