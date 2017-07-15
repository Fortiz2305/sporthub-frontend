import React, { PropTypes } from 'react';
import NewActivityForm from '../components/NewActivityForm.jsx';
import Auth from '../modules/Auth.jsx';
import Config from '../config/config.js';


class NewActivityPage extends React.Component {

 constructor(props, context) {
   super(props, context);

   const date = new Date();
   date.setFullYear(date.getFullYear() - 1);
   date.setHours(0, 0, 0, 0);

   this.state = {
     errors: {},
     currentUser: {},
     activity: {
       name: '',
       sport: '',
       place: '',
       user: '',
       date: date,
       hour: date
     },
     successMessage: '',
     optionValue: null
   };

   this.processForm = this.processForm.bind(this);
   this.changeActivity = this.changeActivity.bind(this);
   this.showMessage = this.showMessage.bind(this);
   this.changeDate = this.changeDate.bind(this);
   this.changeHour = this.changeHour.bind(this);
  }

  componentDidMount() {
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
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const users = encodeURIComponent(this.state.currentUser.email);
    const name = encodeURIComponent(this.state.activity.name);
    const sport = encodeURIComponent(this.state.activity.sport);
    const place = encodeURIComponent(this.state.activity.place);
    const date = encodeURIComponent(this.state.activity.date);
    const hour = encodeURIComponent(this.state.activity.hour);
    const activityData = `name=${name}&sport=${sport}&place=${place}&users=${users}&date=${date}&hour=${hour}`;

    fetch(`http://${Config.backendURL}/api/v1/activities`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      },
      body: activityData
    })
    .then((response) => {
      return response.json();
    })
    .then((activityInfo) => {
      if (activityInfo.success === true) {
        this.setState({
          errors: {}
        });
        localStorage.setItem('activitySuccessMessage', activityInfo.message);
        console.log('Success')
      } else {
        const errors = activityInfo.errors ? activityInfo.errors : {};
        errors.summary = activityInfo.message;

        this.setState({
          errors: errors
        });
        console.log('Fail')
      }
    });
  }

  /**
   * Change the activity object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeActivity(event) {
    const field = event.target.name;
    const activity = this.state.activity;
    activity[field] = event.target.value;

    this.setState({
      activity: activity
    });
  }

  /**
   * Change the date field in the activity.
   *
   * @param {object} event - the JavaScript event object
   * @param {Date} date - the new Date
   */
  changeDate(event, date) {
    const activity = this.state.activity;
    activity['date'] = date
    this.setState({
      activity: activity
    });
  }

  /**
   * Change the hour field in the activity.
   *
   * @param {object} event - the JavaScript event object
   * @param {String} hour - the new Hour
   */
  changeHour(event, hour) {
    const activity = this.state.activity;
    activity['hour'] = hour
    this.setState({
      activity: activity
    });
  }

  /**
   * Show success message
   *
   * @param {object} event - JavaScript event object
   */
  showMessage(event) {
    const message = localStorage.getItem('activitySuccessMessage');
    if (message !== null) {
      this.state.successMessage = message;
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <NewActivityForm
        onSubmit={this.processForm}
        onChange={this.changeActivity}
        activity={this.state.activity}
        errors={this.state.errors}
        onClick={this.showMessage}
        successMessage={this.state.successMessage}
        onChangeDate={this.changeDate}
        onChangeHour={this.changeHour}
      />
    );
  }

}

export default NewActivityPage;
