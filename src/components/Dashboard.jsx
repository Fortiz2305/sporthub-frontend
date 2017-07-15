import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Dashboard = () => (
  <div>
    <Card>
      <CardTitle
        title="Welcome to SportHub"
        subtitle="You can see the available activities or publish your first one."
      />
      <CardMedia>
        <img src="images/sporthub.jpg"/>
      </CardMedia>
      <CardActions>
        <FlatButton label="See current activities" containerElement={<Link to="/activities" />}/>
        <FlatButton label="Publish activity" containerElement={<Link to="/add"/>} />
      </CardActions>
    </Card>

  </div>
);

export default Dashboard;
