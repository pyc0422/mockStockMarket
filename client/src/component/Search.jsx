import React from 'react';
import StockListEntry from "./StockListEntry.jsx"
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  onClick (e) {
    this.props.onSearch(this.state.input, () => {
      this.setState({
        input: ''
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
      <div>
        <input onChange={this.onChange.bind(this)} value={this.state.input}></input>
        <button onClick={this.onClick.bind(this)}>Search</button>
        <StockListEntry />
      </div>
    )
  }
}


export default Search;