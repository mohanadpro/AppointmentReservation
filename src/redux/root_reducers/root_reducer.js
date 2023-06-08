import {combineReducers} from 'redux';
import patientReducer, { createPatientReducer,patientByNameReducer,deletePatientReducer,editPatientReducer } from '../patient/patient-reducer';
import { signinReducer } from '../user/signin/signin-reducer';
import { createDoctorReducer, deleteDoctorReducer, editDoctorReducer, getDoctorReducer,getDoctorWithPaginationReducer } from '../doctor/doctor-reducer';
import userReducer from '../user/userlist/user-list-reducer';
import {deleteUserReducer} from '../user/userlist/user-list-reducer';
import searchReducer from '../search/search-reducer';
import reserveReducer, { createReserveReducer, deleteReserveReducer, getSpecificReservationReducer, patientReservationsReducer } from '../reserve-appointment/create/reserve-appointment-reducer';
import { createSettingReducer, getSettingReducer } from '../settings/settings-reducer';
import { authenticationReducer } from '../user/authentication/authentication-reducer';

const rootReducer=combineReducers({
      patient:patientReducer,
      producByName:patientByNameReducer,
      createPatient:createPatientReducer,
      deletePatient:deletePatientReducer,
      editPatient:editPatientReducer,
      signIn:signinReducer,
      authentication:authenticationReducer,
      deleteDoctor:deleteDoctorReducer,
      createDoctor:createDoctorReducer,
      editDoctor:editDoctorReducer,
      doctor:getDoctorReducer,
      doctorWithPagination:getDoctorWithPaginationReducer,
      search:searchReducer,
      users:userReducer,
      deleteUser:deleteUserReducer,
      getSpecificReservation:getSpecificReservationReducer,
      reservations:reserveReducer,
      createReservation:createReserveReducer,
      deleteReservation:deleteReserveReducer,
      settings:getSettingReducer,
      createSetting:createSettingReducer,
      patientReservations:patientReservationsReducer
})

export default rootReducer;

