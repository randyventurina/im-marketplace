import { connect } from 'react-redux'
import LoginPage from 'views/Pages/LoginPage'
import { loginUser } from 'views/Pages/LoginPageActions'
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginUserClick: (event, name) => {
      event.preventDefault();

      dispatch(loginUser(ownProps.history));
    }
  }
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default withRouter(LoginPageContainer);
