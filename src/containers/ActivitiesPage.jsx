import React from 'react';
import Auth from '../modules/Auth.jsx';
import Activities from '../components/Activities.jsx';
import Config from '../config/config.js';

class ActivitiesPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      currentUser: {},
      errors: {},
      successMessage: ''
    }

    this.joinActivity = this.joinActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
  }

  componentDidMount() {
    fetch(`http://${Config.backendURL}/api/v1/activities`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((activities) => {
      activities.forEach((activity) => {
        activity.date = this.formatDate(activity.date);
        activity.hour = this.formatHour(activity.hour);
      });
      this.setState({ activities: activities });
    });
    fetch(`http://${Config.backendURL}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      this.setState({ currentUser: user });
    });
  }

  /**
  * Join to an existing activity.
  *
  * @param {object} activity - activity to join to
  */
  joinActivity(activity) {
    const user = encodeURIComponent(this.state.currentUser.email);
    const payload = `user=${user}`;

    fetch(`http://${Config.backendURL}/api/v1/activities/${activity.name}/join`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      },
      body: payload
    })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      if (result.success === true) {
        this.setState({
          errors: {},
          successMessage: result.message
        });
      } else {
        const errors = result.errors ? result.errors : {};
        errors.summary = result.message;
        this.setState({
          errors
        });
      }
    });
  }

  formatHour(date) {
    date = new Date(date)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  formatDate(date) {
    date = new Date(date);
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  /**
  * Join to an existing activity.
  *
  * @param {object} activity - activity to delete
  */
  deleteActivity(activity) {
    if (this.state.currentUser.name !== activity.users[0]) {
      const errors = { 'summary': 'You are not able to delete this activity. You are not the activity owner'}
      this.setState({ errors });
    } else {
      fetch(`http://${Config.backendURL}/api/v1/activities/name/${activity.name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `bearer ${Auth.getToken()}`
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        if (result.success === true) {
          this.setState({
            errors: {},
            successMessage: result.message
          });
        } else {
          const errors = result.errors ? result.errors : {};
          errors.summary = result.message;
          this.setState({
            errors
          });
        }
      });
    }
  }

  render() {
    if (this.state.activities.length > 0) {
      return (
        <div className="container-fluid">
          <Activities
            activityList={this.state.activities}
            joinActivity={this.joinActivity}
            deleteActivity={this.deleteActivity}
            successMessage={this.state.successMessage}
            errorMessage={this.state.errors.summary}
          />
        </div>
      )
    } else {
      return <p className="text-center">There are no activities</p>
    }
  }
}

export default ActivitiesPage;
