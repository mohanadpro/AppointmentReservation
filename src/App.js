
import ReserveAppointment from './component/reserve-appointment/reserve-appointment';
import DoctorList from './component/doctor-managment/doctor-list/doctor-list';
import { Route, Routes } from 'react-router-dom';
import Login from './component/user-managment/login/login';
import PatientList from './component/patient-managment/patient-list/patient-list';
import Sidebar from './component/sidebar/sidebar';
import './App.css'
import Users from './component/user-managment/user-list/user-list';
import CreatePatient from './component/patient-managment/create-patient';
import CreateDoctor from './component/doctor-managment/create-doctor';
import CreateUser from './component/user-managment/create-user/create-user';
import Settings from './component/settings/create-settings';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticationAction } from './redux/user/authentication/authentication-action';
function App(props) {

  useEffect(() => {
    props.authenticationFunc();
  },[])

  const routes = [
    {
      path: "/",
      element: props.authenticationState && props.authenticationState.data && props.authenticationState.data.isAuth ? <DoctorList /> : <Login />,
    },
    {
      path: "/home",
      element: <DoctorList />
    },
    {
      path: "/create-doctor",
      element: <CreateDoctor />
    }
    ,
    {
      path: "/reserve-appointment",
      element: <ReserveAppointment />
    },
    {
      path: "/patients",
      element: <PatientList />,
    },
    {
      path: "/edit-patient",
      element: <CreatePatient />,
    },
    {
      path: "/create-patient",
      element: <CreatePatient />,
    }
    ,
    {
      path: "/users",
      element: <Users />
    },
    {
      path: "/create-user",
      element: <CreateUser />
    },
    {
      path: "/settings",
      element: <Settings />
    }
  ];


  return <div>
    <div className='d-flex'>
      <div className='col-md-1'>
        <Sidebar />
      </div>
      <div className='col-md-11'>
        <Routes>
          {
            routes.map(item => <Route key={item.path} path={item.path} element={item.element} />
            )}
        </Routes>
      </div>
    </div>
  </div>
}



const mapStateToProps = (state) => {
  return {
    authenticationState: state.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticationFunc: () => dispatch(authenticationAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
