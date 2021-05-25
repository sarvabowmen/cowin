import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as SubmitUserInfoStore from '../store/SubmitUserInfo';

// At runtime, Redux will merge together...
type SubmitUserInfoProps =
SubmitUserInfoStore.UserInfoUiState // ... state we've requested from the Redux store
  & typeof SubmitUserInfoStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{}>; // ... plus incoming routing parameters

  type SubmitUserInfoState = SubmitUserInfoStore.UserInfoUiState;

class FetchData extends React.Component<SubmitUserInfoProps, SubmitUserInfoState> {
    private states: Array<any>;
    constructor(props: any) {
        super(props);
        this.states = [{ "state_id": 0, "state_name": "Select a State" },{ "state_id": 1, "state_name": "Andaman and Nicobar Islands" }, { "state_id": 2, "state_name": "Andhra Pradesh" }, { "state_id": 3, "state_name": "Arunachal Pradesh" }, { "state_id": 4, "state_name": "Assam" }, { "state_id": 5, "state_name": "Bihar" }, { "state_id": 6, "state_name": "Chandigarh" }, { "state_id": 7, "state_name": "Chhattisgarh" }, { "state_id": 8, "state_name": "Dadra and Nagar Haveli" }, { "state_id": 37, "state_name": "Daman and Diu" }, { "state_id": 9, "state_name": "Delhi" }, { "state_id": 10, "state_name": "Goa" }, { "state_id": 11, "state_name": "Gujarat" }, { "state_id": 12, "state_name": "Haryana" }, { "state_id": 13, "state_name": "Himachal Pradesh" }, { "state_id": 14, "state_name": "Jammu and Kashmir" }, { "state_id": 15, "state_name": "Jharkhand" }, { "state_id": 16, "state_name": "Karnataka" }, { "state_id": 17, "state_name": "Kerala" }, { "state_id": 18, "state_name": "Ladakh" }, { "state_id": 19, "state_name": "Lakshadweep" }, { "state_id": 20, "state_name": "Madhya Pradesh" }, { "state_id": 21, "state_name": "Maharashtra" }, { "state_id": 22, "state_name": "Manipur" }, { "state_id": 23, "state_name": "Meghalaya" }, { "state_id": 24, "state_name": "Mizoram" }, { "state_id": 25, "state_name": "Nagaland" }, { "state_id": 26, "state_name": "Odisha" }, { "state_id": 27, "state_name": "Puducherry" }, { "state_id": 28, "state_name": "Punjab" }, { "state_id": 29, "state_name": "Rajasthan" }, { "state_id": 30, "state_name": "Sikkim" }, { "state_id": 31, "state_name": "Tamil Nadu" }, { "state_id": 32, "state_name": "Telangana" }, { "state_id": 33, "state_name": "Tripura" }, { "state_id": 34, "state_name": "Uttar Pradesh" }, { "state_id": 35, "state_name": "Uttarakhand" }, { "state_id": 36, "state_name": "West Bengal" }];
    }
state: SubmitUserInfoState = {
    email: '',
    mobile: 0,
    ageRange: 0,
    isLoading: false,
    showForm: false,
    isError: false,
    success: false,
    selectedState: 0,
    selectedDistrict: 0,
    };
  public render() {
    return (
      <React.Fragment>
            <h1 id="tabelLabel">Enter User information for Cowin vaccination notification</h1>
            { !this.state.showForm ?
                <button onClick={this.buttonClick}>Enter Your Info to Subscribe for Vaccination Notification</button> : null}
        {this.state.showForm ? this.renderSubmitUserInfoForm() : null}
      </React.Fragment>
    );
    }

    private buttonClick = (event: any) => {
        this.setState<any>({
            showForm: !this.state.showForm
        });
    }

 private handleInputChange = (event: any) => {
    const target = event.target;
    let value: any;
    if( target.type === 'checkbox')
    {
        let isChecked: boolean = false;
        isChecked = target.checked;
        if (isChecked) {
            value = parseInt(target.value);
        } else { return; }
    }
    else {
      value = target.value;
    }
    const name = target.name;
     if (name == "selectedState") {
         this.props.fetchDistricts(value);
         value = parseInt(value);
     }
     if (name == "selectedDistrict") {
         value = parseInt(value);
     }
    this.setState<any>({
      [name]: value
    });
  }

    private renderSubmitUserInfoForm = () => {
      const { email, mobile, ageRange } = this.state;
    return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
                Email:
                <input name="email" type="text" value={email} onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
          <label>
              Mobile:
              <input name="mobile" type="number" value={mobile} onChange={this.handleInputChange} />
          </label>
        </div>
        <div>
            <label>
            LessThan45:
            <input
                name="ageRange"
                type="checkbox"
                        checked={ageRange == 0 ? true : false}
                        value={0}
                onChange={this.handleInputChange} />
            </label>
            <label>
            GreaterThan45:
            <input
                name="ageRange"
                type="checkbox" value={1}
                checked={ageRange == 1 ? true: false }
                onChange={this.handleInputChange} />

            </label>
        </div>
            <div>
                <select name="selectedState" value={this.state.selectedState} onChange={ this.handleInputChange }>
                    {this.states.map((e:any, key: any) => {
                        return <option key={key} value={e.state_id}>{e.state_name}</option>;
                    })}
                </select>
            </div>
            <div>
                <select name="selectedDistrict" value={this.state.selectedDistrict} onChange={this.handleInputChange}>
                    {this.props.districts && this.props.districts.districts.map((e: any, key: any) => {
                        return <option key={key} value={e.district_id}>{e.district_name}</option>;
                    })}
                </select>
            </div>
            <div>

        <input type="submit" value="Submit" />
        </div>
            { this.props.isError ?
                <div style={{ color: "red" }}>
                    <label>
                        Failed to Update the record please try again
                </label>
                </div>
                : null
            }
            { !this.props.isError && this.props.success ?
                <div style={{ color: "blue" }}>
                    <label>
                        Record successfully updated
                </label>
                </div>
                : null
            }
    </form>
    );
  }

  private handleSubmit = (event: any) => {
    this.props.submitUserInfo(this.state);
    event.preventDefault();
  }
}

export default connect(
  (state: ApplicationState) => state.submitUserInfo, // Selects which state properties are merged into the component's props
  SubmitUserInfoStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
