import { connect } from 'react-redux';
import RegisterPage from 'views/Pages/RegisterPage';
import { signUpUser } from 'views/Pages/RegisterPageActions';
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignUpFormSubmit: (name) => {
      dispatch(signUpUser(ownProps.history, name))
    }
  }
}

const RegisterPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)

export default withRouter(RegisterPageContainer);
