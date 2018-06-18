import { connect } from 'react-redux';
import TaskListPage from 'views/Pages/TaskListPage';
import { loadTaskList } from 'views/Pages/TaskListPageActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (event, name) => {
      event.preventDefault();

      dispatch(loadTaskList(ownProps.history));
    }
  }
}

const TaskListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListPage)

export default withRouter(TaskListPageContainer);
