import * as React from 'react';
import { connect } from 'react-redux';
import SubmitUserInfo from './SubmitUserInfo';

const Home = () => (
  <div className="container">
    <SubmitUserInfo></SubmitUserInfo>
    <div style={{ padding: "40px", color: "green" }}><strong>To get instant COVID-19 Vaccination availablity notifications please subscribe to <a href="https://t.me/cowinvaccinenotifications">https://t.me/cowinvaccinenotifications</a></strong></div>
  </div>
);

export default connect()(Home);
