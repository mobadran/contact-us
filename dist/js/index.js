document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    let formIsValid = true;

    // Get form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryType = document.querySelector('input[name="query"]:checked');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');


    // Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate first name
    if (!firstName.value) {
        firstName.classList.add('invalid');
        document.getElementById('firstName-p').style.display = 'block';
        formIsValid = false;
    } else {
        firstName.classList.remove('invalid');
        document.getElementById('firstName-p').style.display = 'none';
    }

    // Validate last name
    if (!lastName.value) {
        lastName.classList.add('invalid');
        document.getElementById('lastName-p').style.display = 'block';
        formIsValid = false;
    } else {
        lastName.classList.remove('invalid');
        document.getElementById('lastName-p').style.display = 'none';
    }

    // Validate Email
    if (!validateEmail(email.value)) {
        email.classList.add('invalid');
        document.getElementById('email-p').style.display = 'block';
    } else {
        email.classList.remove('invalid');
        document.getElementById('email-p').style.display = 'none';
    }


    // Validate query type
    if (!queryType) {
        document.getElementById('query-p').style.display = 'block';
        formIsValid = false;
    } else {
        document.getElementById('query-p').style.display = 'none';
    }

    // Validate message
    if (!message.value) {
        message.classList.add('invalid');
        document.getElementById('message-p').style.display = 'block';
        formIsValid = false;
    } else {
        message.classList.remove('invalid');
        document.getElementById('message-p').style.display = 'none';
    }

    // Validate consent
    if (!consent.checked) {
        consent.classList.add('invalid');
        document.getElementById('consent-p').style.display = 'block';
        formIsValid = false;
    } else {
        consent.classList.remove('invalid');
        document.getElementById('consent-p').style.display = 'none';
    }

    if (formIsValid) {
        // Form is valid, you can proceed with form submission
        console.log('Form is valid and ready to be submitted.');
        // You can submit the form here using AJAX or any other method
    } else {
        // Show a general error message or highlight the invalid fields
        console.log('Form is invalid. Please fill out all required fields.');
    }
});