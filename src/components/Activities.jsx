import React, { PropTypes } from 'react';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Activities = ({
  activityList,
  joinActivity,
  deleteActivity,
  successMessage,
  errorMessage
}) => (
  <div>
    <div className="text-center activities_title">
      <h2>Current activities</h2>
    </div>

    <ol className="activity-list">
      {activityList.map((activity, i) => (
        <li className="activity-list-item" key={i}>
          <Card>
            <CardHeader
              title={activity.name}
              subtitle={activity.sport}
              avatar={"images/" + activity.sport + ".jpg"}
            />
            <CardText>
              Players: {activity.users.length} / {activity.numPlayers} <br/>
              Place: {activity.place} <br />
              Date: {activity.date} <br />
              Hour: {activity.hour}
            </CardText>
            <CardActions>
              <FlatButton label="Join" onClick={() => joinActivity(activity) } />
              <FlatButton label="Delete" onClick={() => deleteActivity(activity) } />
            </CardActions>
          </Card>
         </li>
        ))}
    </ol>
    <div className="join-success-message">
        <span className="join-success-message">{successMessage}</span>
    </div>
    <div className="error-message">
        <span className="error-message">{errorMessage}</span>
    </div>
  </div>
)

Activities.propTypes = {
  activityList: PropTypes.array.isRequired,
  joinActivity: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};

export default Activities;
