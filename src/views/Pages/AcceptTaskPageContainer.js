import { connect } from 'react-redux'
import AcceptTaskPage from 'views/Pages/AcceptTaskPage'
import { acceptTask } from 'views/Pages/AcceptTaskPageActions'
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (event) => {
      event.preventDefault();

      dispatch(acceptTask(ownProps.history));
    }
  }
}

const AssignTaskPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptTaskPage)

export default withRouter(AssignTaskPageContainer);
