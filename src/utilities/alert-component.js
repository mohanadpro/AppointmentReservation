import Swal from "sweetalert2"

class AlertClass{

    AlertDelete(message,theFunction) {
       return Swal.fire({
            icon: 'warning',
            title:  message, showDenyButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
          }).then((result) => {
            if (result.isConfirmed) {
            theFunction();
            } else if (result.isDenied) {

            }
        })
    
    }
}

export default new AlertClass()