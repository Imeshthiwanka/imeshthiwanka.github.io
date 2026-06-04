document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       1. MOBILE MENU TOGGLE
    ========================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

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

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');

                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* =========================
       2. ACTIVE NAV LINK
    ========================= */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');

    navLinksList.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* =========================
       3. SCROLL ANIMATION
    ========================= */
    const faders = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.15
    });

    faders.forEach(el => observer.observe(el));

    /* =========================
       4. EMAILJS CONTACT FORM (FIXED)
    ========================= */

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {

        // Init EmailJS ONCE
        emailjs.init('rzs91dagywGaa9--d');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            try {
                const response = await emailjs.send(
                    'service_yyjhm2i',
                    'template_0zcpmy8',
                    {
                        from_name: document.getElementById('name').value,
                        from_email: document.getElementById('email').value,
                        message: document.getElementById('message').value
                    }
                );

                console.log("SUCCESS:", response);

                formMessage.textContent = '✅ Message sent successfully!';
                formMessage.className = 'form-message success';

                contactForm.reset();

            } catch (error) {
                console.log("ERROR:", error);

                formMessage.textContent = '❌ Something went wrong. Please try again!';
                formMessage.className = 'form-message error';
            }

            btn.innerHTML = originalText;
            btn.disabled = false;

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }

});