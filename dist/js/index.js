document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    let formIsValid = true;

    // Get form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const queryType = document.querySelector('input[name="query"]:checked');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');

    // Validate first name
    if (!firstName.value) {
        firstName.classList.add('invalid');
        formIsValid = false;
    } else {
        firstName.classList.remove('invalid');
    }

    // Validate last name
    if (!lastName.value) {
        lastName.classList.add('invalid');
        formIsValid = false;
    } else {
        lastName.classList.remove('invalid');
    }

    // Validate query type
    if (!queryType) {
        document.getElementById('generalEnquiry').classList.add('invalid');
        document.getElementById('supportRequest').classList.add('invalid');
        formIsValid = false;
    } else {
        document.getElementById('generalEnquiry').classList.remove('invalid');
        document.getElementById('supportRequest').classList.remove('invalid');
    }

    // Validate message
    if (!message.value) {
        message.classList.add('invalid');
        formIsValid = false;
    } else {
        message.classList.remove('invalid');
    }

    // Validate consent
    if (!consent.checked) {
        consent.classList.add('invalid');
        formIsValid = false;
    } else {
        consent.classList.remove('invalid');
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