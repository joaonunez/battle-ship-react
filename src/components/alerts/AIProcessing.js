import Swal from "sweetalert2";
import imageShipDestroyed from "../../assets/img/shipdestroyed.png"
const ShipDestroyedAlert = async () => {
    let timerInterval;
    const result_2 = await Swal.fire({
        title: "La IA esta pensando",
        imageWidth: 400, 
        imageHeight: 200,
        timer: 2000,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
        //aca modifique porque me quize dar el gusto de usar una fuente que me gusta
        customClass: {
            title: "swal-title",
            popup: "swal-popup",
        }
    });
    /* Read more about handling dismissals below */
    if (result_2.dismiss === Swal.DismissReason.timer) {
    }
}

export default ShipDestroyedAlert;