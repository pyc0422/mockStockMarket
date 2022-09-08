import React from 'react';

var Dashboard = (props) => {
  return (
    <div>
      <h2> Avialable Balance: $100,00</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CASH: </td>
            <td>$100.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>CASH: </td>
            <td>$100.00</td>
          </tr>
        </tfoot>

      </table>
    </div>
  )
}

export default Dashboard;