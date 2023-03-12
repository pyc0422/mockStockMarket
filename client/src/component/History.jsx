import React from 'react';
import StockListEntry from "./StockListEntry.jsx";
var History = (props) => {
  return (
    <div className="history">
      <h3>Recent transactions</h3>
      <table style={{margin:'auto'}}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {props.history.map(record => <StockListEntry stock={record} key={record.id}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default History;