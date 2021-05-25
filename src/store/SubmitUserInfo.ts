import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.


export interface UserInfoUiState {
    email: string;
    mobile: number;
    ageRange: number;
    isLoading: boolean;
    showForm: boolean;
    isError: boolean;
    success: boolean;
    selectedState: number;
    selectedDistrict: number;
    districts?: Districts;
}

export interface Districts {

    districts: Array<District>;
}

export interface District {

    districtId: number;
    districtName: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestSubmitUserInfoAction {
    type: 'INITIATE_SUBMIT_USER_INFO';
}

interface PostSubmitUserInfoAction {
    type: 'POST_USER_INFO_SUCCESS';
    success: boolean;
}

interface ErrorSubmitUserInfoAction {
    type: 'ERROR_SUBMIT_USER_INFO';
    userInfo: UserInfoUiState
}


interface GetDistrictsSuccessAction {
    type: 'GET_DISTRICTS_SUCCESS';
    districts: Districts
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestSubmitUserInfoAction | PostSubmitUserInfoAction | ErrorSubmitUserInfoAction | GetDistrictsSuccessAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    submitUserInfo: (userInfo: UserInfoUiState): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

            const appState = getState();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-functions-key': 'tJjo9yQTYF8dafvX8LgTgQGgP6ZiN2Thq07zDTktX8KlTlvkGAxARw=='},
                body: JSON.stringify(userInfo)
            };
            if (appState) {
                fetch(`https://cowinapinew.azurewebsites.net/api/CowinApi/`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                    })
                    .then(data => {
                        dispatch({ type: 'POST_USER_INFO_SUCCESS', success: true });
                    }).catch((error) => {
                        // Your error is here!
                        dispatch({ type: 'ERROR_SUBMIT_USER_INFO', userInfo: userInfo });
                    });

                dispatch({ type: 'INITIATE_SUBMIT_USER_INFO' });
            }
        
    },

    fetchDistricts: (stateId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        const appState = getState();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-functions-key': 'tJjo9yQTYF8dafvX8LgTgQGgP6ZiN2Thq07zDTktX8KlTlvkGAxARw==' }
        };
        if (appState) {
            fetch('https://cowinapinew.azurewebsites.net/api/DistrictsApi?state_id='+stateId, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    dispatch({ type: 'GET_DISTRICTS_SUCCESS', districts: data });
                }).catch((error) => {
                    throw error;
                });
        }

    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserInfoUiState = {
    isLoading: false, success: false, email: '', mobile: 0, ageRange: 0, showForm: true, isError: false, selectedDistrict: 0,
    selectedState: 0, };

export const reducer: Reducer<UserInfoUiState> = (state: UserInfoUiState | undefined, incomingAction: Action): UserInfoUiState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INITIATE_SUBMIT_USER_INFO':
            return {
                isLoading: true,
                email: '', mobile: 0, ageRange: 0, showForm: true,
                isError: false,
                success: false,
                selectedDistrict:0,
                selectedState: 0,
            };
        case 'POST_USER_INFO_SUCCESS':
                return {
                    email: '',  
                    mobile: 0, 
                    ageRange: 0, 
                    isLoading: false,
                    showForm: true,
                    isError: false,
                    success: true,
                    selectedDistrict: 0,
                    selectedState: 0,
            };
            case 'ERROR_SUBMIT_USER_INFO':
                return {
                    email: action.userInfo.email,
                    mobile: action.userInfo.mobile,
                    ageRange: action.userInfo.ageRange,
                    isLoading: false,
                    selectedDistrict: action.userInfo.selectedDistrict,
                    selectedState: action.userInfo.selectedState,
                    districts: action.userInfo.districts,
                    showForm: true,
                    isError: true,
                    success: false,
            };
        case 'GET_DISTRICTS_SUCCESS':
            action.districts.districts.push({ districtId: 0, districtName: "Select a District" });
            return {
                email: state.email,
                mobile: state.mobile,
                ageRange: state.ageRange,
                isLoading: false,
                showForm: true,
                isError: false,
                success: false,
                districts: action.districts,
                selectedDistrict: 0,
                selectedState: state.selectedState
            };
            }

    return state;
};

