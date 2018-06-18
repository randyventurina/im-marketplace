import { connect } from 'react-redux'
import CreateTaskPage from 'views/Pages/CreateTaskPage'
import { createTask } from 'views/Pages/CreateTaskPageActions'
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (event) => {
      event.preventDefault();

      dispatch(createTask(ownProps.history));
    }
  }
}

const CreateTaskPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskPage)

export default withRouter(CreateTaskPageContainer);
