import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchAction } from "../../../redux/search/search-action";
import { getPatientByInsuranceNumberAction, getSpecificPatientsAction } from "../../../redux/patient/patient-action";
import './header.css'
function Header(props) {
      const [search, setSearch] = useState({ typeOfSearch: 'Patients', searchLetters: '', insuranceNumber: '' });
      const [searchInsurance, setSearchInsurance] = useState('');
      const [displaySearchContainer, setDisplaySearchContainer] = useState(false);
      const [patient, setPatient] = useState('');
      const history = useNavigate();

      const handelKeyDown=e=>{
            if (e.key === 'Enter') {
                  {props.getPatientByInsuranceNumber(searchInsurance, history)}
            }
      }
      useEffect(() => {
            if (search.searchLetters.length > 0) {
                  props.search(search);
            }
      }, [search.searchLetters])
      return <div className="row mt-5 header-container container" >
            <div className="title col-md-3">
                  <h1>List Patients</h1>
            </div>
            <div className="form-group input-block-level col-md-4">
                  <input type="text" value={search.searchLetters} className="form-control" placeholder="Search using patient name"

                        onChange={e => {
                              if (e.target.value != '')
                                    setDisplaySearchContainer(true);
                              else
                                    setDisplaySearchContainer(false);

                              setSearch({ ...search, searchLetters: e.target.value })
                        }} />
                  {displaySearchContainer && props.searchData.data && props.searchData.data.results &&
                        <div className='col-sm-12 col-md-12 search-container'>
                              <ul>
                                    {props.searchData.data.results.map((e, i) => <li key={i}
                                          style={{ textAlign: "start", color: 'black' }}
                                          onClick={() => {
                                                setSearch({ ...search, searchLetters: '' });
                                                setPatient(e);
                                                setDisplaySearchContainer(false);
                                                props.getSpecificPatient(e._id, history);
                                          }}>
                                          {e.name}
                                    </li>)}
                              </ul>
                        </div>
                  }
            </div>
            <div className="form-group input-block-level col-md-4">
                  <input type="text" value={searchInsurance} className="form-control"
                   placeholder="Enter using insurance number"
                        onChange={e => setSearchInsurance(e.target.value)}

                        onKeyDown={handelKeyDown}
                  />
            </div>
            <div className="d-flex justify-content-end col-md-1" style={{ height: '40px' }}>
                  <Link to="/create-patient" className="btn btn-danger"><FontAwesomeIcon icon={faPlus} /> </Link>
            </div>
      </div>
}

const mapStateToProps = (state) => {
      return {
            searchData: state.search,
      }
}
const mapDispatchToProps = dispatch => {
      return {
            search: (search) => dispatch(searchAction(search)),
            getSpecificPatient: (id, history) => dispatch(getSpecificPatientsAction({ patientId: id, history: history })),
            getPatientByInsuranceNumber: (insuranceNumber, history) => dispatch(getPatientByInsuranceNumberAction({ insuranceNumber: insuranceNumber, history: history }))
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
