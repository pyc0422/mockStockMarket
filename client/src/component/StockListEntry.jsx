import React from 'react';

const StockListEntry = (props) => {
  return (
    <tr>
      <td>symbol</td>
      <td>shares</td>
      <td>action</td>
      <td>$price</td>
      <td>createAt</td>
      <td>$total</td>
    </tr>
  )
}

export default StockListEntry;