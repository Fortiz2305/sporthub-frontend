import React from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';

const HomePage = () => (
  <Card className="dashboard-card">
    <CardTitle title="SportHub" subtitle="The site where you can find people to play with you in your sport activities." />
    <CardMedia>
      <img src="images/sporthub.jpg"/>
    </CardMedia>
  </Card>
);

export default HomePage;
