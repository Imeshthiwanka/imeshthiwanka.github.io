document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Hamburger Animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburger) {
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // 2. Active Menu Status (Multi-page Support)
    const currentPath = window.location.pathname;
    const navLinksList = document.querySelectorAll('.nav-links a');

    navLinksList.forEach(link => {
        const href = link.getAttribute('href');
        const filename = currentPath.split('/').pop() || 'index.html';
        
        if (filename === href || (filename === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Scroll Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Contact Form — EmailJS Integration
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        // Initialize EmailJS with your Public Key
        emailjs.init('rzs91dagywGaa9--d'); // <-- STEP 4: Paste your EmailJS Public Key here

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_email: 'imeshthiwanka200325@gmail.com'
            };

            emailjs.send('service_clabe7u', 'template_wst9aev', templateParams) // <-- STEP 2 & 3: Paste Service ID and Template ID
                .then(() => {
                    formMessage.textContent = '✅ Message sent! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    setTimeout(() => formMessage.classList.add('hidden'), 5000);
                }, (error) => {
                    formMessage.textContent = '❌ Something went wrong. Please try again or email me directly.';
                    formMessage.className = 'form-message error';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    setTimeout(() => formMessage.classList.add('hidden'), 5000);
                });
        });
    }
});

