// ============= toggle icon navbar =============

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// =============scroll sections active link=============

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            });
        }
    });

    // ============= Sticky navbar =============
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // ============= remove toggle icon and navbar when click navbar link (scroll) =============
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

// ============= scroll reveal =============

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


// ============= typed js =============
const typed = new Typed('.multiple-text', {
    strings: ['BackEnd Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    delaySpeed: 1000,
    loop: true
});

// ==============Contact section==============

const form = document.querySelector('#contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('name').value,
        contactNumber: parseInt(document.getElementById('mobileNo').value),
        email: document.getElementById('email').value,
        emailSubject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }

    // Send data using fetch API
    fetch('https://portfoliowebsitesbackendapis.onrender.com/api/v1/contactMe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }
            return response.json();
        })
        .then(data => {
            // console.log('Server Response:', data);
            if (data.success) {
                // Success: Message sent
                alert(data.message);
            } else {
                // Error: Message not sent
                alert('Message not sent. Please try again.');
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle network errors or server errors
            alert('An error occurred while sending the message. Please try again.');
        });

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobileNo').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}); 