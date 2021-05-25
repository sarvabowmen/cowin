import * as React from 'react';
import { connect } from 'react-redux';
import SubmitUserInfo from './SubmitUserInfo';

const Home = () => (
  <div className="container">
    <SubmitUserInfo></SubmitUserInfo>
  </div>
);

export default connect()(Home);
