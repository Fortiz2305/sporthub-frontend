import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


const NewActivityForm = ({
  onSubmit,
  onChange,
  activity,
  errors,
  onClick,
  successMessage,
  onChangeDate,
  onChangeHour
}) => (
  <div>
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">New Activity</h2>

        <div className="field-line">
          <TextField
            hintText="Tennis in Madrid"
            floatingLabelText="Name"
            floatingLabelFixed={true}
            name="name"
            onChange={onChange}
            errorText={errors.summary}
            value={activity.name}
          />
        </div>

        <div className="field-line">
          <TextField
            hintText="soccer, tennis or basketball"
            floatingLabelText="Sport"
            floatingLabelFixed={true}
            name="sport"
            onChange={onChange}
            errorText={errors.summary}
            value={activity.sport}
          />
        </div>

        <div className="field-line">
          <TextField
            hintText="Madrid"
            floatingLabelText="Place"
            floatingLabelFixed={true}
            name="place"
            onChange={onChange}
            errorText={errors.summary}
            value={activity.place}
          />
        </div>

        <div className="field-line">
          <DatePicker
            onChange={onChangeDate}
            floatingLabelText="Date"
            floatingLabelFixed={true}
            hintText="Select a date" />
        </div>

        <div className="field-line">
          <TimePicker
            format="ampm"
            onChange={onChangeHour}
            floatingLabelText="Hour"
            floatingLabelFixed={true}
            hintText="Select an hour"/>
        </div>

        <div className="button-line">
          <RaisedButton type="submit" label="Add" onClick={onClick} primary />
        </div>

      </form>
    </Card>
    <div className="add-success-message">
        <span>{successMessage}</span>
    </div>
  </div>
);

NewActivityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onChangeHour: PropTypes.func.isRequired
};

export default NewActivityForm;
