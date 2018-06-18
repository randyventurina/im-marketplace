import { connect } from 'react-redux'
import CompleteTaskPage from 'views/Pages/CompleteTaskPage'
import { completeTask } from 'views/Pages/CompleteTaskPageActions'
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (event) => {
      event.preventDefault();

      dispatch(completeTask(ownProps.history));
    }
  }
}

const CompleteTaskPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteTaskPage)

export default withRouter(CompleteTaskPageContainer);
