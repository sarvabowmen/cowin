import * as React from 'react';
import { connect } from 'react-redux';
import SubmitUserInfo from './SubmitUserInfo';

const Home = () => (
  <div>
    <SubmitUserInfo></SubmitUserInfo>
  </div>
);

export default connect()(Home);
