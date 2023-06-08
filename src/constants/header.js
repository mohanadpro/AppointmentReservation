const headers={
    'Content-Type':'application/json',
    'Authorization':'JWT '+JSON.parse(localStorage.getItem('user')).token
}
export default headers;