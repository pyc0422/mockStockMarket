import React from 'react';
import StockListEntry from './StockListEntry.jsx'

// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user_id: 0,
//       username: '',
//       cash: 0,
//       user_stocks: []
//     }
//   }


//   componentDidUpdate() {
//     console.log('updated!');
//     this.setState({
//       user_id: this.props.user.id,
//       username: this.props.user.name,
//       cash: this.props.user.cash,
//     })
//   }

//   render() {
const Dashboard = (props) => {
  return (
    <div>
      <h2> Avialable Balance: ${props.user.cash}</h2>
      {props.stocks.length ? (
        <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Avg Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.stocks.map(stock => <StockListEntry stock={stock} key={stock.id}/>)}
        </tbody>
        <tfoot>
          <tr>
            <td>CASH: </td>
            <td>${props.user.cash}</td>
          </tr>
        </tfoot>
      </table>
      ) : null}
    </div>
  )
}


export default Dashboard;