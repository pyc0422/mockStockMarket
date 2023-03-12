import React from 'react';
import StockListEntry from "./StockListEntry.jsx";
var History = (props) => {
  return (
    <div className="history">
      <p>Recent transactions: </p>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Order</th>
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