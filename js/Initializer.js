const howTo = new Slider();
const stationsMap = new Bikemap(49.437489866065405, 1.096252291204278);
const stationInfos = new Station();
const timer = new Timer();
const newBooking = new Booking();
const signaturePad = new Signature();

$('#surname').val(localStorage.getItem('surname'));
$('#name').val(localStorage.getItem('name'));

if (sessionStorage.getItem('station') !== null) {
	$('#reservation-message').html(`
		${localStorage.getItem('surname').toUpperCase()} ${localStorage.getItem('name').toUpperCase()}, VOUS AVEZ UN VÉLO RÉSERVÉ à LA STATION ${sessionStorage.getItem('station')} PENDANT 
		<span id="minutes">${sessionStorage.getItem('minutes')}</span>mn<span id="seconds">${sessionStorage.getItem('seconds')}</span>s
	`);
	timer.resume();
}