import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const style = {
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

// title_onChange(event) {
//   this.setState({ title: event.target.value });
// }

// description_onChange(event){
//   this.setState({description: event.target.value});
// }

// taskList_onLoad(event) {
//   event.preventDefault();

//   if (this.state.title.length < 10)
//   {
//     return alert('Please fill in the task title.');
//   }

//   if (this.state.description.length < 10)
//   { 
//     return alert('Please fill in the task description.');
//   }

//   this.props.onClick(event);
// }     

function TaskListPage({ ...props }) {
  const { classes } = props;
  return (
    <GridContainer> 
      <GridItem xs={12}>
        <Card plain>
          <CardHeader color="rose" icon plain>
            <CardIcon color="rose">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
              Tasks in Colony<small>
                {" "}
                - The table shows all tasks assigned to you
              </small>
            </h4>
          </CardHeader>
          <CardBody plain>
            <Table
              hover
              tableHead={["Title", "Description", "Status"]}
              tableData={[
                ["Dakota Rice", "$36,738", "Active"],
                ["Minerva Hooper", "$23,789", "Active"],
                ["Sage Rodriguez", "$56,142", "Active"],
                [                  
                  "Philip Chaney",
                  "$38,735", "Active"
                ],
                [
                  "Doris Greene",
                  "$63,542", "Active"                 
                ],
                ["Mason Porter", "$78,615", "Active"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>       
    </GridContainer>
  );
}

export default withStyles(style)(TaskListPage);
