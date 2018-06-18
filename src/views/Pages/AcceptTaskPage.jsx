import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"; 

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline"; 

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
 
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class AcceptTaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b",
      title: "",
      description: ""
    }; 
  } 

  acceptTask_onClick(event) {
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

                  inputProps={{
                    type: "text"
                  }}
                />                 
                <Button color="rose" onClick={this.acceptTask_onClick.bind(this)} >Accept Task</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>         
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(AcceptTaskPage);
