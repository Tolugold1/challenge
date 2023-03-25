import React from 'react';
import SignUp from './Signup/signUp';
import SignIn from './Signup/signin';
import DashboardPage from "./Dashboard/Dashboard";
import ChallengePage from './Challenges/ChallengePage';
import PostSchedule from './Post_Scheduler/PostSchedule';
import Details from './Signup/details';
import { Route, Switch, withRouter } from "react-router-dom";
import { Login_user, Get_user_details } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import layout from './layout/layout';
import "./layout/layout.styles.scss"


const mapPropToState = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  postLoginDetails: (username, password) => {dispatch(Login_user(username, password))},
  Get_user_details: () => {dispatch(Get_user_details())},
});

// layout function


// Main function

class Main extends React.Component  {
  
  render() {
    const DashboardApp = layout(DashboardPage);
    const ChallengeApp = layout(ChallengePage);
    const PostScheduleApp = layout(PostSchedule);

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' element={() => <SignIn login={this.props.login} postLoginDetails={this.props.postLoginDetails} />} />
          <Route exact path='/dashboard' component={DashboardApp } />
          <Route exact path='/signin' component={SignIn } />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/details' component={Details} />
          <Route exact path='/challenge' component={ChallengeApp} />
          <Route exact path='/postschedule' component={PostScheduleApp} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapPropToState, mapDispatchToProps)(Main));
