import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
// import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
// import Check from "@material-ui/icons/Check";
// import Contacts from "@material-ui/icons/Contacts";
// import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CreateTaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b",
      title: "",
      description: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }


  title_onChange(event) {
    this.setState({ title: event.target.value });
  }

  description_onChange(event){
    this.setState({description: event.target.value});
  }

  createTask_onClick(event) {
    event.preventDefault() 

    if (this.state.title.length < 10)
    {
      return alert('Please fill in the task title.');
    }

    if (this.state.description.length < 10)
    { 
      return alert('Please fill in the task description.');
    }

    this.props.onClick(event);
  }     
  
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <MailOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Create Task</h4>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  labelText="Title"
                  id="title"
                  formControlProps={{
                    fullWidth: true
                  }}

                  value = {this.state.title}

                  onChange = {this.title_onChange.bind(this)}

                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput
                  labelText="Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}

                  value = {this.state.description}
                  
                  onChange = {this.description_onChange.bind(this)}

                  inputProps={{
                    type: "text"
                  }}
                />                 
                <Button color="rose" onClick={this.createTask_onClick.bind(this)} >Create Task</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>         
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(CreateTaskPage);
