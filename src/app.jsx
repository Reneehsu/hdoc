import React from 'react';
import { connect } from 'react-redux';
import _Register from './component/_Register';
import _Document from './component/_Document';
import _Login from './component/_Login';
import _Portal from './component/_Portal';

const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user,
    doc: state.doc
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch({type: 'PAGE', page: page}),
    setUser: (user) => dispatch({type: 'SET_USER', user: user}),
    setDoc: (doc) => dispatch({type: 'SET_DOC', doc: doc})
  }
}

const Register = connect (
  mapStateToProps,
  mapDispatchToProps
) (_Register);

const Login = connect (
  mapStateToProps,
  mapDispatchToProps
) (_Login);

const Portal = connect (
  mapStateToProps,
  mapDispatchToProps
) (_Portal);

const Document = connect (
  mapStateToProps,
  mapDispatchToProps
) (_Document);

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.page === "Document" ? <Document /> : null}
        {this.props.page === "Register" ? <Register /> : null}
        {this.props.page === "Login" ? <Login /> : null}
        {this.props.page === "Portal" ? <Portal /> : null}
      </div>
    );
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (App);
