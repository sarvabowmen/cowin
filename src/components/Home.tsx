import * as React from 'react';
import { connect } from 'react-redux';
import SubmitUserInfo from './SubmitUserInfo';

const Home = () => (
  <div className="container">
    <SubmitUserInfo></SubmitUserInfo>
    <div style={{ padding: "40px", color: "green" }}>
      <div style={{ padding: "20px 0px", color: "black" }}>
       <div> Steps to subscribe for notifications:</div>
       <div>1. Open Telegram and go to search bar</div>
       <div>2. Paste the link given above</div>
       <div>3. Click on JOIN</div>
      </div>
      <strong>To get instant COVID-19 Vaccination availablity notifications please subscribe to <a href="https://t.me/cowinvaccinenotifications">https://t.me/cowinvaccinenotifications</a></strong>
    </div>
  </div>
);

export default connect()(Home);
