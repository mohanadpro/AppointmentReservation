import React, { useEffect } from 'react'
import './list-user.css'
import { getUsersAction, deleteUserAction } from '../../../redux/user/userlist/user-list-action';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import AlertClass from '../../../utilities/alert-component';
import './list-user.css';
import Header from './header';
import Loader from '../../loader/loader';
function Users(props) {
      const history = useNavigate();
      useEffect(() => {
            props.getUsers(history);
      }, [])
      return (
            <div className='user-list container'>
            <Header/>
                  {props.userData && props.userData.loading ? <Loader/> :
                        props.userData && props.userData.error ? <h1>{props.userData.error}</h1> :
                              <div>
                                    <div>
                                          {props.userDeleted && props.userDeleted.error ? <h6 style={{ color: 'red' }}>{props.userDeleted.error}</h6> : null}
                                    </div>
                                    <table className="table">
                                          <thead className="thead-dark">
                                                <tr>
                                                      <th scope="col">#</th>
                                                      <th scope="col">User Name</th>
                                                      <th scope="col">Type of User</th>
                                                      <th scope="col" className="d-flex justify-content-center">Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody>

                                                {props.userData && props.userData.data && props.userData.data.map((item, index) => <tr key={item._id}>
                                                      <th scope="row">{index + 1}</th>
                                                      <td>{item.username}</td>
                                                      <td>Admin</td>
                                                      <td>
                                                            <div className="d-flex justify-content-around">
                                                                  <button className="btn" style={{ backgroundColor: 'transparent' }}
                                                                        onClick={() =>
                                                                              AlertClass.AlertDelete('Are you sure you want to delete user ' + item.username + '?',()=>props.deleteUser(item._id))
                                                                        }
                                                                  ><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /></button>
                                                            </div>
                                                      </td>
                                                </tr>)}
                                          </tbody>
                                    </table>
                              </div>
                  }
            </div>
      )
}
const mapStateToProps = (state) => {
      return {
            userData: state.users,
            userDeleted: state.deleteUser
      }
}
const mapDispatchToProps = dispatch => {

      return {
            getUsers: (history) => dispatch(getUsersAction({ history: history })),
            deleteUser: (id) => dispatch(deleteUserAction(id))
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)