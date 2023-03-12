import React from 'react';

const StockShow = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.stock[0]}</td>
          <td>{props.stock[1]}</td>
          <td>{props.stock[2]}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StockShow;