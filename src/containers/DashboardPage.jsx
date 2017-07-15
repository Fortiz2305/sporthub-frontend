import React from 'react';
import Auth from '../modules/Auth.jsx';
import Dashboard from '../components/Dashboard.jsx';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-card">
        <Dashboard/>
      </div>
    );
  }
}

export default DashboardPage;
