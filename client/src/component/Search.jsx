import React from 'react';
import StockShow from "./StockShow.jsx"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      param: []
    }
  }

  onClick (e) {
    this.props.onSearch(this.state.input, (stockData) => {
      console.log(stockData);
      this.setState({
        input: '',
        param: stockData
      })
    })
  }

  onChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (

      <div style={{margin:'auto'}}>
        <h3 style={{textShadow: "0 0 3px #000000", color:'white'}}>
          Enter symbol to search
        </h3>
        <p style={{color:'black'}}><a className="text1" href="https://stockanalysis.com/stocks/">Click here</a> if you don't know the symbol</p>
        <input style={{height:'2.5em', width:'20em'}} onChange={this.onChange.bind(this)} value={this.state.input}></input>
        <button className='btn' onClick={this.onClick.bind(this)}>Search</button>
        { this.state.param.length === 0 ? null : <StockShow stock={this.state.param}/> }
      </div>
    )
  }
}


export default Search;