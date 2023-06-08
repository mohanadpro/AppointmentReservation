import {
      GET_PATIENT_FAILURE, GET_PATIENT_SUCCESS, GET_PATIENT_REQUEST,
      GET_PATIENT_BY_NAME_REQUEST, GET_PATIENT_BY_NAME_SUCCESS, GET_PATIENT_BY_NAME_FAILURE
      , CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS, CREATE_PATIENT_FAILURE, DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE,
      EDIT_PATIENT_REQUEST, EDIT_PATIENT_SUCCESS, EDIT_PATIENT_FAILURE
} from "../../constants/redux-constant";
import axios from 'axios';
import { SERVER_URL } from "../../constants/server-url";

// get patients **********************************
const getPatientRequest = () => {
      return {
            type: GET_PATIENT_REQUEST
      }
}

const getPatientSuccess = patients => {
      return {
            type: GET_PATIENT_SUCCESS,
            payload: patients
      }
}

const getPatientFailure = (error) => {
      return {
            type: GET_PATIENT_FAILURE,
            payload: error
      }
}

export const getPatientsAction = ({ pageNumber, history }) => {

      return (dispatch) => {
            if (JSON.parse(localStorage.getItem('user')) == null) {
                  dispatch(getPatientFailure('error'))
                  history('/')
            }
            else {
                  const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
                  }

                  dispatch(getPatientRequest());
                  axios.get(SERVER_URL + '/patients/withPagination/' + pageNumber, { headers: headers })
                        .then(res => {
                              const patients = res.data.data;

                              dispatch(getPatientSuccess(patients))
                        })
                        .catch(err => {
                              if (err.response.status == 408) {
                                    localStorage.removeItem('user')
                                    history('/')
                                    window.location.reload(false);
                              }
                              else {
                                    dispatch(getPatientFailure(err))
                              }

                        })
            }
      }
}

// Get Specific Patient

export const getSpecificPatientsAction = ({ patientId, history }) => {

      return (dispatch) => {
            if (JSON.parse(localStorage.getItem('user')) == null) {
                  dispatch(getPatientFailure('error'))
                  history('/')
            }
            else {
                  const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
                  }

                  dispatch(getPatientRequest());
                  axios.get(SERVER_URL + '/patients/' + patientId, { headers: headers })
                        .then(res => {
                              const patients = res.data.data;

                              dispatch(getPatientSuccess(patients))
                        })
                        .catch(err => {
                              if (err.response.status == 408) {
                                    localStorage.removeItem('user')
                                    history('/')
                                    window.location.reload(false);
                              }
                              else {
                                    dispatch(getPatientFailure(err))
                              }

                        })
            }
      }
}

// Get Patient By Insurance Number

export const getPatientByInsuranceNumberAction = ({ insuranceNumber, history }) => {

      return (dispatch) => {
            if (JSON.parse(localStorage.getItem('user')) == null) {
                  dispatch(getPatientFailure('error'))
                  history('/')
            }
            else {
                  const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
                  }

                  dispatch(getPatientRequest());
                  axios.get(SERVER_URL + '/patients/getPatientByInsuranceNumber/' + insuranceNumber, { headers: headers })
                        .then(res => {
                              const patients = res.data.data;

                              dispatch(getPatientSuccess(patients))
                        })
                        .catch(err => {
                              if (err.response.status == 408) {
                                    localStorage.removeItem('user')
                                    history('/')
                                    window.location.reload(false);
                              }
                              else {
                                    dispatch(getPatientFailure(err))
                              }

                        })
            }
      }
}


// Create Patient **********************************
const createPatientRequest = () => {
      return {
            type: CREATE_PATIENT_REQUEST
      }
}

const createPatientSuccess = (message) => {
      return {
            type: CREATE_PATIENT_SUCCESS,
            payload: message
      }
}

const createPatientFailure = (error) => {
      return {
            type: CREATE_PATIENT_FAILURE,
            payload: error
      }
}

export const createPatientAction = (patient, pageNumber, history) => {

      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
      }

      return async (dispatch) => {
            dispatch(createPatientRequest());
            axios.post(SERVER_URL + '/patients/', patient, { headers: headers })
                  .then(res => {
                        dispatch(createPatientSuccess(res.data.message))
                        dispatch(getPatientsAction(pageNumber));
                        history('/patients')
                  })
                  .catch(err => {
                        console.log(err);
                        if (err.response.status == 408) {
                              localStorage.removeItem('user')
                              history('/')
                              window.location.reload(false);
                        }
                        else {
                              dispatch(createPatientFailure(err.response.data.message))
                        }
                  })
      }
}
//**********************************************************

// Delete Patient *************************************

const deletePatientRequest = () => {
      return {
            type: DELETE_PATIENT_REQUEST
      }
}

const deletePatientSuccess = (message) => {
      return {
            type: DELETE_PATIENT_SUCCESS,
            payload: message
      }
}

const deletePatientFailure = (error) => {
      return {
            type: DELETE_PATIENT_FAILURE,
            payload: error
      }
}

export const deletePatientAction = (id, pageNumber, history) => {
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
      }

      return async dispatch => {
            dispatch(deletePatientRequest());
            axios.get(SERVER_URL + '/patients/deletePatient/' + id, {
                  headers: headers
            })
                  .then(res => {
                        dispatch(deletePatientSuccess(res.message));
                        dispatch(getPatientsAction(pageNumber))
                  })
                  .catch(err => {
                        if (err.response.status == 408) {
                              localStorage.removeItem('user')
                              history('/patients')
                              window.location.reload(false);
                        }
                        else {
                              dispatch(deletePatientFailure(err))
                        }
                  })
      }
}
// **************************************************

const editPatientRequest = () => {
      return {
            type: EDIT_PATIENT_REQUEST
      }
}

const editPatientSuccess = (message) => {
      return {
            type: EDIT_PATIENT_SUCCESS,
            payload: message
      }
}

const editPatientFailure = (err) => {
      return {
            type: EDIT_PATIENT_FAILURE,
            payload: err
      }
}

export const editPatientAction = (patient, pageNumber, history) => {
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('user')).token
      }
      return async (dispatch) => {
            dispatch(editPatientRequest());
            axios.patch(SERVER_URL + '/patients/' + patient._id, patient, { headers: headers })
                  .then(res => {
                        dispatch(editPatientSuccess(res.message));
                        dispatch(getPatientsAction(pageNumber));
                        history('/patients')
                  })
                  .catch(err => {
                        console.log(err);
                        if (err.response.status == 408) {
                              localStorage.removeItem('user')
                              history('/')
                              window.location.reload(false);
                        }
                        else {
                              dispatch(editPatientFailure(err))
                        }
                  })
      }
}