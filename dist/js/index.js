// // const sentWidth = document.getElementById('sent-container').clientWidth;
// // document.getElementById('sent-container').style.right = `calc(50% - ${sentWidth})`;



// // On Submit
// document.getElementById('form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     let formIsValid = true;

//     // Get form fields
//     const firstName = document.getElementById('firstName');
//     const lastName = document.getElementById('lastName');
//     const email = document.getElementById('email');
//     const queryType = document.querySelector('input[name="query"]:checked');
//     const message = document.getElementById('message');
//     const consent = document.getElementById('consent');
//     const form = document.getElementById('form');


//     // Functions
//     function validateEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     async function sendData() {
//         // Associate the FormData object with the form element
//         const formData = new FormData(form);

//         // Convert FormData to a query string
//         const queryString = new URLSearchParams(formData).toString();

//         try {
//             const response = await fetch(`https://httpbin.org/get?${queryString}`, {
//                 method: "GET"
//             });
//             console.log(await response.json());
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     // Validate first name
//     if (!firstName.value) {
//         firstName.classList.add('invalid');
//         document.getElementById('firstName-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         firstName.classList.remove('invalid');
//         document.getElementById('firstName-p').style.display = 'none';
//     }

//     // Validate last name
//     if (!lastName.value) {
//         lastName.classList.add('invalid');
//         document.getElementById('lastName-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         lastName.classList.remove('invalid');
//         document.getElementById('lastName-p').style.display = 'none';
//     }

//     // Validate Email
//     if (!validateEmail(email.value)) {
//         email.classList.add('invalid');
//         document.getElementById('email-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         email.classList.remove('invalid');
//         document.getElementById('email-p').style.display = 'none';
//     }


//     // Validate query type
//     if (!queryType) {
//         document.getElementById('query-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         document.getElementById('query-p').style.display = 'none';
//     }

//     // Validate message
//     if (!message.value) {
//         message.classList.add('invalid');
//         document.getElementById('message-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         message.classList.remove('invalid');
//         document.getElementById('message-p').style.display = 'none';
//     }

//     // Validate consent
//     if (!consent.checked) {
//         consent.classList.add('invalid');
//         document.getElementById('consent-p').style.display = 'block';
//         formIsValid = false;
//     } else {
//         consent.classList.remove('invalid');
//         document.getElementById('consent-p').style.display = 'none';
//     }

//     if (formIsValid) {
//         console.log('Form is valid and ready to be submitted.');
//         sendData();
//         form.reset();
//         document.getElementById('sent-container').style.display = 'flex';
//         document.getElementById('sent-container').style.animation = "finalAnim 6s forwards";
//         setTimeout(() => {
//             document.getElementById('sent-container').style.animation = "";
//             document.getElementById('sent-container').style.display = 'none';
//         }, 6000);
//     } else {
//         console.log('Form is invalid. Please fill out all required fields.');
//     }
// });

const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const type = document.querySelectorAll('input[name="type"]');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');

    // Reset invalid classes
    reset([firstName, lastName, email, message, consent]);
    reset([...type], document.getElementById('query-type-container'));

    // Check required fields
    const firstNameValid = checkReqField(firstName);
    const lastNameValid = checkReqField(lastName);
    const emailValid = checkReqField(email);
    const radioValid = checkRadio(type, document.getElementById('query-type-container'))
    const messageValid = checkReqField(message);
    const consentValid = checkReqField(consent);

    // Email validation
    if (emailValid) {
        validateEmail(email);
    }
    if (messageValid) {
        validateMessage(message);
    }

    if (!firstNameValid || !lastNameValid || !emailValid || !radioValid || !messageValid || !consentValid) {
        return;
    }

    // Sending the data
    const formData = new FormData(form);

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const responseUrl = `https://httpbin.org/get?${new URLSearchParams(data.form).toString()}`;
            console.log(responseUrl);
            // window.open(responseUrl, '_blank');
        })
        .catch(error => console.error('Error:', error));
    form.reset();
    document.querySelector('header').classList.add('sent')
});

const reset = (inputs, container = null) => {
    for (const input of inputs) {
        if (input.type === 'radio') {
            container.classList.remove('invalid-input');
            input.parentElement.parentElement.classList.remove('invalid-input');
        }
        input.parentElement.classList.remove('invalid-input');
        input.parentElement.classList.remove('other-validation');
    }
}

const checkReqField = field => {
    if (field.type === 'checkbox' && !field.checked) {
        // field.parentElement.classList.add('invalid-input');
        notValid(field)
        return false;
    } else if (field.type === 'checkbox' && field.checked) return true;

    if (field.value.trim() === '') {
        // field.parentElement.classList.add('invalid-input');
        notValid(field)
        return false;
    } else {
        return true;
    }
}

const checkRadio = (btns, container) => {
    for (const btn of btns) {
        if (btn.checked) return true;
    }
    container.classList.add('invalid-input');
    for (const btn of btns) {
        // btn.parentElement.parentElement.classList.add('invalid-input');
        notValid(btn.parentElement)
    }
    return false;
}

const validateEmail = input => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(input.value.trim())) {
        input.parentElement.classList.add('other-validation');
    }
}

const validateMessage = input => {
    const messageRegex = /^(.|\n){30,}$/g;
    if (!messageRegex.test(input.value.trim())) {
        input.parentElement.classList.add('other-validation')
    }
}

const notValid = element => {
    element.parentElement.classList.add('invalid-input');
}