import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInForm from '../../SignInForm';
import Students from '../../Students';
import SignUpForm from '../../SignUpForm';
import Task from '../../Task';
import CreateNewTask from '../../CreateNewTask';
import EditTask from '../../EditTask';
import Projects from '../../Projects';
import Tasks from '../../Tasks';
import { useSelector } from 'react-redux';

const SwitchRouter = () => {
  const isLogin = useSelector((state) => state.app.isLogin);

  return (
    <Switch>
      <Route exact path="/signUp" component={SignUpForm} />
      <Route exact path="/signIn" component={SignInForm} />
      {isLogin && (
        <React.Fragment>
          <Route exact path="/all_projects" component={Projects} />
          <Route exact path="/project/:id/tasks" component={Tasks} />
          <Route
            exact
            path="/project/:id/tasks/create-new-task"
            component={CreateNewTask}
          />
          <Route exact path="/project/:_id/tasks/:id" component={Task} />
          <Route
            exact
            path="/project/:id/tasks/:id/edit"
            component={EditTask}
          />
          <Route exact path="/students" component={Students} />
        </React.Fragment>
      )}
    </Switch>
  );
};

export default SwitchRouter;
