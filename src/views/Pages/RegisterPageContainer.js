import { connect } from 'react-redux'
import RegisterPage from 'views/Pages/RegisterPage'
import { signUpUser } from 'views/Pages/RegisterPageActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name) => {
      dispatch(signUpUser(name))
    }
  }
}

const RegisterPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)

export default RegisterPageContainer
