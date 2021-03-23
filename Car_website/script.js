//const url = 'http://localhost:8080';

$(document).ready(function() {

	/*// Get All customers
	$('#btn-get-students').click(() => {
		console.log('Getting all students')
		$.get('http://localhost:3000/students', (res) => {
			console.log('data:', res);
		})
	})

	// Get All Students
	$('#btn-get-student-by-id').click(() => {
		const id = $('#student-id').val();
		console.log(`Requesting student with id ${id}`);

		$.get(url + `/students/${id}`, (res) => {
			// res is an array!
			const student = Student.fromRow(res[0]);
			console.log('data:', student);
		});
	});*/

	// Create customer
	$('registration').click(() => {
		console.log('Customer sing up');

		const Name = $('#name').val();
		const Email = $('#email').val();
		const Passwords = $('#password').val();
		const Driverlicence = $('#licence').val();
		const Phonenumber = $('#number').val();
		const customer = new customer (Name, Email, Passwords, Driverlicence, Phonenumber);

		console.log(customer);

		$.post(url + '/registration', customer, (res) => {
			console.log("Created ", res)
		});
	});

	// Delete Student
	/*$('#btn-delete-student').click(() => {
		console.log('Deleting a student');
		const id = $('#student-id-delete').val();

		$.ajax({
			url: url + `/students/${id}`,
			type: 'DELETE',
			success: (res) => {
			  console.log('delete response', res)
			},
			error: (err) => {
				console.log('delete error', err)
			}
		});
	});*/

	
});