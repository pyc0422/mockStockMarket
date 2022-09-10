import React from 'react';

const StockListEntry = (props) => {
  return (
    <tr>
      <td>{props.stock.symbol}</td>
      <td>{props.stock.name}</td>
      <td>{props.stock.shares}</td>
      <td>{props.stock.price}</td>
      <td>${props.stock.total}</td>
      {props.stock.createAt ? (<td>${props.stock.createAt}</td>) : null}
    </tr>
  )
}

export default StockListEntry;