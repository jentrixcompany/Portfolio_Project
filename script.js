    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('section');
        const navLinksArray = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // SPECTACULAR PARTICLE ANIMATION
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;

        // Random color variation
        const hue = 200 + Math.random() * 40; // Blue hues
        particle.style.background = `linear-gradient(135deg, hsla(${hue}, 100%, 65%, 0.7), hsla(${hue + 20}, 100%, 65%, 0.5))`;

        // Random animation duration
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);

        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Create code elements floating animation
    function createCodeElement() {
        const codeElement = document.createElement('div');
        codeElement.classList.add('code-float');

        // Random code snippets
        const codeSnippets = [
            '&lt;div&gt;',
            'function()',
            '{ }',
            '.class',
            '#id',
            'console.log',
            'const x =',
            'let arr =',
            'if()',
            'return',
            'margin: 0',
            'padding: 0',
            'display: flex',
            'grid-template',
            '@media'
        ];

        codeElement.innerHTML = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

        // Random position
        codeElement.style.left = `${Math.random() * 100}%`;

        // Random animation duration
        const duration = Math.random() * 15 + 15;
        codeElement.style.animationDuration = `${duration}s`;

        // Random animation delay
        codeElement.style.animationDelay = `${Math.random() * 3}s`;

        // Random font size
        codeElement.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`;

        // Random opacity
        codeElement.style.opacity = `${Math.random() * 0.5 + 0.3}`;

        particlesContainer.appendChild(codeElement);

        // Remove after animation
        setTimeout(() => {
            codeElement.remove();
        }, duration * 1000);
    }

    // Generate particles
    function generateParticles() {
        createParticle();
        if (Math.random() > 0.7) {
            createCodeElement();
        }
    }

    // Start particle generation
    setInterval(generateParticles, 200);

    // Create initial particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createParticle();
            if (i % 3 === 0) createCodeElement();
        }, i * 100);
    }

    // FIXED IMAGE MODAL FUNCTIONALITY
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');

    // Image data for the modal
    const images = [
        {
            index: 1,
            src: "pic1.jpg",
            alt: "Professional headshot of Jesse Kiplangat",
            caption: "Professional headshot of Jesse Kiplangat"
        },
        {
            index: 2,
            src: "pic2.jpg",
            alt: "Casual portrait of Jesse Kiplangat",
            caption: "Casual portrait of Jesse Kiplangat"
        },
        {
            index: 3,
            src: "pic3.jpg",
            alt: "Jesse Kiplangat during a creative work session",
            caption: "Jesse Kiplangat during a creative work session"
        }
    ];

    let currentImageIndex = 1;

    // Get the actual images from the gallery for better quality
    function getGalleryImages() {
        const galleryImages = document.querySelectorAll('.gallery-image img');
        const imagesData = [];

        galleryImages.forEach((img, index) => {
            imagesData.push({
                index: index + 1,
                src: img.src,
                alt: img.alt,
                caption: img.alt
            });
        });

        return imagesData;
    }

    // Use either the predefined images or get from gallery
    let modalImages = images;

    // Open modal when clicking gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Get images from gallery
            modalImages = getGalleryImages();

            const index = parseInt(item.getAttribute('data-index'));
            currentImageIndex = index;
            updateModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-image')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navigation between images
    prevImage.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = currentImageIndex === 1 ? modalImages.length : currentImageIndex - 1;
        updateModal();
    });

    nextImage.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = currentImageIndex === modalImages.length ? 1 : currentImageIndex + 1;
        updateModal();
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentImageIndex = currentImageIndex === 1 ? modalImages.length : currentImageIndex - 1;
                updateModal();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentImageIndex = currentImageIndex === modalImages.length ? 1 : currentImageIndex + 1;
                updateModal();
            }
        }
    });

    function updateModal() {
        const imageData = modalImages.find(img => img.index === currentImageIndex);
        if (imageData) {
            // Preload image for smooth transition
            const img = new Image();
            img.src = imageData.src;

            img.onload = () => {
                modalImage.src = imageData.src;
                modalImage.alt = imageData.alt;
                modalCaption.textContent = imageData.caption;

                // Add fade-in effect
                modalImage.style.opacity = '0';
                setTimeout(() => {
                    modalImage.style.transition = 'opacity 0.3s ease';
                    modalImage.style.opacity = '1';
                }, 50);
            };

            // Fallback if image fails to load
            img.onerror = () => {
                modalImage.src = imageData.src;
                modalImage.alt = imageData.alt;
                modalCaption.textContent = imageData.caption;
                console.warn(`Failed to load image: ${imageData.src}`);
            };
        }
    }

    // Skill cards animation on scroll
    const skillCards = document.querySelectorAll('.skill-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effect to contact methods
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateY(-5px) scale(1.02)';
        });

        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-2px) scale(0.98)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-8px) scale(1.03)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Add loading animation for images
    const galleryImages = document.querySelectorAll('.gallery-image img');
    galleryImages.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // Check if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });

            // Fallback in case image fails to load
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                img.style.opacity = '1';
                // You could set a placeholder image here
            });
        }
    });

    // Add animation to social links on page load
    document.querySelectorAll('.social-link').forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';

        setTimeout(() => {
            link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });

    // Add scroll progress indicator (optional)
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // You could use this to create a scroll progress bar if needed
        // console.log(scrollPercent);
    });

    // Initialize everything when page loads
    document.addEventListener('DOMContentLoaded', () => {
        // Trigger initial scroll event to set active nav
        window.dispatchEvent(new Event('scroll'));

        // Add fade-in effect to all sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index > 0) { // Skip hero section
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.1 });

                sectionObserver.observe(section);
            }
        });

        // Preload images for better performance
        const imageUrls = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });

        // Add typing effect to hero title (optional)
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        };

        // Uncomment to enable typing effect
        // setTimeout(typeWriter, 1000);
    });
