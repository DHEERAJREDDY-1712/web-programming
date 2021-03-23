class customer {
	constructor(Name, Email, Passwords, Driverlicence, Phonenumber) {
		this.Name = Name;
		this.Email = Email;
		this.Passwords = Passwords;
        this.Driverlicence = Driverlicence;
		this.Phonenumber = Phonenumber;
	}

    static fromRow(row) {
        return new Student(row.Name, row.Email, row.Passwords, row.Driverlicence, row.Phonenumber);
    }

	toString() {
		console.log(`Name [${Name}]  Email [${Email}] Password [${Passwords}] Driverlicence [${Driverlicence}] Phoneumber [${Phonenumber}] `)
	}
}