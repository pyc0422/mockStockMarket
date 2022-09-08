import React from 'react';
import StockListEntry from "./StockListEntry.jsx";
var History = () => {
  return (
    <div>
      <p>Recent transactions: </p>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Order</th>
            <th>Price</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
      <tbody>
        <StockListEntry />
      </tbody>
      <tfoot>
        <tr>
          <th>TOTAL: </th><td>$123.00</td>
        </tr>

      </tfoot>
      </table>
    </div>
  )
}

export default History;