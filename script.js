// VR Headset Website - Interactive JavaScript

class VRWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupProductInteractions();
        this.setupNewsletterForm();
        this.setupAnimations();
        this.setupParallaxEffects();
        this.setupParticleSystem();
        this.setupReviewInteractions();
        this.setupShowcaseInteractions();
        this.setupNavInteractions();
        this.setupScrollToTop();
    }

    // Loading Screen
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        const header = document.querySelector('.header');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            
            // Header background on scroll
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide scroll indicator when scrolling
            if (scrollIndicator) {
                if (scrollY > 200) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navigation
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinksList = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Product Interactions
    setupProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        const addToBagBtns = document.querySelectorAll('.add-to-bag-btn');

        // Product card hover effects
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                this.createRippleEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });

            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-15px) scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                }, 150);
            });
        });

        // Add to bag button interactions
        addToBagBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleAddToBag(btn);
            });
        });

        // Setup image loading with fallbacks
        this.setupImageLoading();
    }

    setupImageLoading() {
        const productImages = document.querySelectorAll('.product-image-main');
        const authorAvatars = document.querySelectorAll('.author-avatar');
        
        // Handle product images
        productImages.forEach(img => {
            // Add loading state
            img.addEventListener('loadstart', () => {
                img.style.opacity = '0.5';
            });
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                // Hide the image and show fallback design
                img.style.display = 'none';
                const fallback = img.nextElementSibling;
                if (fallback && (fallback.classList.contains('fallback-design') || 
                               fallback.classList.contains('controller-design') || 
                               fallback.classList.contains('lens-protector-design'))) {
                    fallback.style.display = 'flex';
                }
            });
        });

        // Handle author avatars
        authorAvatars.forEach(img => {
            img.addEventListener('error', () => {
                // Fallback is already handled in HTML with onerror
                console.log('Avatar image failed to load, using fallback');
            });
        });

        // Dynamic pricing animation
        this.animatePricing();
    }

    handleAddToBag(btn) {
        const originalText = btn.innerHTML;
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        const productId = productCard.getAttribute('data-product');
        
        // Button animation
        btn.innerHTML = '<i class="fas fa-check"></i><span>ADDED!</span>';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        
        // Add to cart
        this.addToCart(productName, productPrice, productId);
        
        // Reset button after animation
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 2000);

        // Add to cart animation
        this.animateAddToCart(productCard);
    }

    animateAddToCart(productCard) {
        const productImg = productCard.querySelector('.product-img');
        const clone = productImg.cloneNode(true);
        
        clone.style.position = 'fixed';
        clone.style.top = productImg.getBoundingClientRect().top + 'px';
        clone.style.left = productImg.getBoundingClientRect().left + 'px';
        clone.style.width = productImg.offsetWidth + 'px';
        clone.style.height = productImg.offsetHeight + 'px';
        clone.style.zIndex = '9999';
        clone.style.transition = 'all 0.5s ease';
        clone.style.pointerEvents = 'none';
        
        document.body.appendChild(clone);
        
        setTimeout(() => {
            clone.style.transform = 'translate(-50vw, -50vh) scale(0.1)';
            clone.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(clone);
        }, 600);
    }

    animatePricing() {
        const prices = document.querySelectorAll('.current-price');
        
        prices.forEach(price => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.countUpAnimation(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(price);
        });
    }

    countUpAnimation(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const prefix = text.replace(/[0-9.]/g, '');
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = prefix + current.toFixed(2);
        }, 30);
    }

    // Newsletter Form
    setupNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        const emailInput = document.getElementById('emailInput');
        const submitBtn = form.querySelector('.subscribe-btn');
        const messageDiv = form.querySelector('.form-message');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmit(emailInput, submitBtn, messageDiv);
        });

        // Email validation on input
        emailInput.addEventListener('input', () => {
            this.validateEmail(emailInput);
        });
    }

    handleNewsletterSubmit(input, btn, messageDiv) {
        const email = input.value.trim();
        
        if (!this.isValidEmail(email)) {
            this.showFormMessage(messageDiv, 'Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>SUBSCRIBING...</span>';
        btn.disabled = true;

        setTimeout(() => {
            this.showFormMessage(messageDiv, 'Successfully subscribed! Welcome to our newsletter.', 'success');
            input.value = '';
            btn.innerHTML = '<span>SUBSCRIBE</span><i class="fas fa-paper-plane"></i>';
            btn.disabled = false;
            
            // Confetti effect
            this.createConfetti();
        }, 2000);
    }

    validateEmail(input) {
        const email = input.value.trim();
        const isValid = this.isValidEmail(email);
        
        if (email && !isValid) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        
        setTimeout(() => {
            element.className = 'form-message';
        }, 5000);
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.product-card, .newsletter-content, .footer-column, .review-card, .feature-item');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Parallax Effects
    setupParallaxEffects() {
        const heroBackground = document.querySelector('.hero-background');
        const networkOverlay = document.querySelector('.network-overlay');
        const vrUser = document.querySelector('.vr-user');
        let parallaxTicking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            // Only apply parallax if elements are in viewport
            if (scrolled < window.innerHeight * 2) {
                const rate = scrolled * -0.3; // Reduced intensity

                if (heroBackground) {
                    heroBackground.style.transform = `translateY(${rate}px)`;
                }

                if (networkOverlay) {
                    networkOverlay.style.transform = `translateY(${rate * 0.2}px)`;
                }

                if (vrUser) {
                    vrUser.style.transform = `translateY(${rate * 0.1}px)`;
                }
            }
            
            parallaxTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        });
    }

    // Particle System - Optimized
    setupParticleSystem() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        // Reduce particle count for better performance
        if (particlesContainer && window.innerWidth > 768) {
            for (let i = 0; i < 10; i++) {
                this.createParticle(particlesContainer);
            }
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }

    // Utility Functions
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    createConfetti() {
        const colors = ['#00d4ff', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    z-index: 10000;
                    animation: confetti-fall 3s linear forwards;
                    pointer-events: none;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    document.body.removeChild(confetti);
                }, 3000);
            }, i * 50);
        }
    }

    // Review Interactions
    setupReviewInteractions() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateStars(card);
            });
            
            card.addEventListener('click', () => {
                this.showReviewDetails(card);
            });
        });
    }

    animateStars(card) {
        const stars = card.querySelectorAll('.review-stars i');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                star.style.color = '#f59e0b';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }

    showReviewDetails(card) {
        const reviewText = card.querySelector('.review-text').textContent;
        const authorName = card.querySelector('.author-info h4').textContent;
        
        this.showNotification(`Review by ${authorName}: "${reviewText.substring(0, 50)}..."`, 'info');
    }

    // Showcase Interactions
    setupShowcaseInteractions() {
        const featureItems = document.querySelectorAll('.feature-item');
        const demoObjects = document.querySelectorAll('.object');
        const showcaseButton = document.querySelector('.vr-showcase .cta-button');
        
        featureItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.highlightFeature(item, index);
            });
            
            item.addEventListener('click', () => {
                this.demonstrateFeature(item, index);
            });
        });

        // Interactive demo objects
        demoObjects.forEach((obj, index) => {
            obj.addEventListener('click', () => {
                this.animateObject(obj, index);
            });
        });

        if (showcaseButton) {
            showcaseButton.addEventListener('click', () => {
                this.startVRDemo();
            });
        }
    }

    highlightFeature(item, index) {
        const demoObjects = document.querySelectorAll('.object');
        if (demoObjects[index]) {
            demoObjects[index].style.transform = 'scale(1.5)';
            demoObjects[index].style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
            
            setTimeout(() => {
                demoObjects[index].style.transform = '';
                demoObjects[index].style.boxShadow = '';
            }, 1000);
        }
    }

    demonstrateFeature(item, index) {
        const features = ['4K Resolution', '3D Audio', 'Hand Tracking', 'Wireless Freedom'];
        const feature = features[index] || 'VR Feature';
        
        this.showNotification(`Demonstrating: ${feature}`, 'info');
        
        // Add visual effect
        item.style.background = 'rgba(0, 212, 255, 0.3)';
        setTimeout(() => {
            item.style.background = '';
        }, 2000);
    }

    animateObject(obj, index) {
        obj.style.animation = 'none';
        obj.offsetHeight; // Trigger reflow
        obj.style.animation = 'objectFloat 0.5s ease-in-out';
        
        // Create ripple effect
        this.createRippleEffect(obj);
    }

    startVRDemo() {
        const demoScreen = document.querySelector('.demo-screen');
        if (demoScreen) {
            demoScreen.style.animation = 'demoRotate 2s ease-in-out';
            
            setTimeout(() => {
                demoScreen.style.animation = 'demoRotate 10s ease-in-out infinite';
            }, 2000);
        }
        
        this.showNotification('VR Demo Started! Experience the immersive world.', 'success');
    }

    // Navbar Interactions
    setupNavInteractions() {
        this.setupSearchFunctionality();
        this.setupCartFunctionality();
        this.setupNavAnimations();
        this.setupMobileMenu();
        this.setupBrandLogo();
        this.setupMegaMenu();
        this.setupAccountDropdown();
        this.setupWishlistFunctionality();
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchSuggestions = document.getElementById('searchSuggestions');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value, searchSuggestions);
            });
            
            searchInput.addEventListener('focus', () => {
                this.showSearchSuggestions(searchSuggestions);
            });
            
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    this.hideSearchSuggestions(searchSuggestions);
                }, 200);
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }
    }

    toggleSearch() {
        const searchBtn = document.querySelector('.nav-search-btn');
        const searchInput = document.querySelector('.search-input');
        
        if (!searchInput) {
            this.createSearchInput();
        } else {
            searchInput.remove();
        }
    }

    createSearchInput() {
        const nav = document.querySelector('.nav');
        const searchBtn = document.querySelector('.nav-search-btn');
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" class="search-input" placeholder="Search VR products...">
            <button class="search-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        searchContainer.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 300px;
            animation: slideDown 0.3s ease;
        `;
        
        nav.style.position = 'relative';
        nav.appendChild(searchContainer);
        
        const searchInput = searchContainer.querySelector('.search-input');
        const searchClose = searchContainer.querySelector('.search-close');
        
        searchInput.focus();
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
        
        searchClose.addEventListener('click', () => {
            searchContainer.remove();
        });
    }

    handleSearchInput(query, suggestionsContainer) {
        if (query.length > 2) {
            const suggestions = this.getSearchSuggestions(query);
            this.displaySearchSuggestions(suggestions, suggestionsContainer);
        } else {
            this.hideSearchSuggestions(suggestionsContainer);
        }
    }

    getSearchSuggestions(query) {
        const products = [
            'Apple Vision Pro',
            'PlayStation VR2',
            'Meta Quest 3',
            'HTC Vive',
            'Valve Index',
            'Touch Controllers',
            'Sense Controllers',
            'VR Stand',
            'VR Play Mat',
            'Lens Protector'
        ];
        
        return products.filter(product => 
            product.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
    }

    displaySearchSuggestions(suggestions, container) {
        container.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                document.querySelector('.search-input').value = suggestion;
                this.performSearch(suggestion);
                this.hideSearchSuggestions(container);
            });
            container.appendChild(item);
        });
        
        this.showSearchSuggestions(container);
    }

    showSearchSuggestions(container) {
        container.classList.add('show');
    }

    hideSearchSuggestions(container) {
        container.classList.remove('show');
    }

    performSearch(query) {
        if (query.trim()) {
            this.showNotification(`Searching for: "${query}"`, 'info');
            // Here you would implement actual search functionality
        }
    }

    setupCartFunctionality() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartDropdown = document.querySelector('.cart-dropdown');
        
        if (cartBtn && cartDropdown) {
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleCartDropdown(cartDropdown);
            });
            
            document.addEventListener('click', () => {
                this.hideCartDropdown(cartDropdown);
            });
        }
    }

    toggleCartDropdown(dropdown) {
        dropdown.classList.toggle('show');
    }

    hideCartDropdown(dropdown) {
        dropdown.classList.remove('show');
    }

    showCart() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        if (cartDropdown) {
            cartDropdown.classList.add('show');
        }
    }

    updateCartCount(count) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.animation = 'cartBounce 0.3s ease';
        }
    }

    addToCart(productName, price, productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if item already exists
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartDisplay();
        this.updateCartCount(cart.length);
        
        this.showNotification(`${productName} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartDisplay();
        this.updateCartCount(cart.length);
        
        this.showNotification('Item removed from cart', 'info');
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.querySelector('.cart-footer');
        const cartTotal = document.querySelector('.cart-total-price');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart" style="text-align: center; color: #6b7280; padding: 2rem 0;">
                    <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.3;"></i>
                    <p style="margin: 0;">Your cart is empty</p>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = parseFloat(item.price.replace('US$ ', '')) * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <i class="fas fa-vr-cardboard"></i>
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">US$ ${itemTotal.toFixed(2)}</div>
                    </div>
                    <button class="cart-item-remove" onclick="vrWebsite.removeFromCart('${item.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = `US$ ${total.toFixed(2)}`;
            cartFooter.style.display = 'block';
        }
    }

    setupNavAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.animateNavLink(link);
            });
        });
    }

    animateNavLink(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1.2)';
            }, 200);
        }
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            this.animateMobileMenuItems();
        }
    }

    animateMobileMenuItems() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    setupBrandLogo() {
        const navBrand = document.querySelector('.nav-brand');
        const vrIcon = document.querySelector('.vr-icon');
        
        if (navBrand) {
            navBrand.addEventListener('click', () => {
                this.animateBrandLogo();
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        if (vrIcon) {
            vrIcon.addEventListener('mouseenter', () => {
                this.enhanceVRIcon();
            });
        }
    }

    animateBrandLogo() {
        const vrIcon = document.querySelector('.vr-icon');
        const logoGlow = document.querySelector('.logo-glow');
        
        if (vrIcon) {
            vrIcon.style.animation = 'none';
            vrIcon.offsetHeight; // Trigger reflow
            vrIcon.style.animation = 'vrPulse 0.5s ease-in-out';
        }
        
        if (logoGlow) {
            logoGlow.style.animation = 'none';
            logoGlow.offsetHeight; // Trigger reflow
            logoGlow.style.animation = 'logoGlow 0.8s ease-in-out';
        }
        
        this.showNotification('Welcome to VR Headsets! 🥽', 'success');
    }

    enhanceVRIcon() {
        const vrIcon = document.querySelector('.vr-icon');
        const vrLens = document.querySelector('.vr-lens');
        
        if (vrIcon && vrLens) {
            vrLens.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 212, 255, 0.5)';
            
            setTimeout(() => {
                vrLens.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
            }, 1000);
        }
    }

    // Mega Menu Functionality
    setupMegaMenu() {
        const categoryBtn = document.querySelector('.category-btn');
        const megaMenu = document.querySelector('.mega-menu');
        
        if (categoryBtn && megaMenu) {
            categoryBtn.addEventListener('mouseenter', () => {
                this.showMegaMenu(megaMenu);
            });
            
            categoryBtn.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    this.hideMegaMenu(megaMenu);
                }, 300);
            });
            
            megaMenu.addEventListener('mouseenter', () => {
                this.showMegaMenu(megaMenu);
            });
            
            megaMenu.addEventListener('mouseleave', () => {
                this.hideMegaMenu(megaMenu);
            });
        }
    }

    showMegaMenu(menu) {
        menu.classList.add('show');
    }

    hideMegaMenu(menu) {
        menu.classList.remove('show');
    }

    // Account Dropdown Functionality
    setupAccountDropdown() {
        const accountBtn = document.querySelector('.account-btn');
        const accountDropdown = document.querySelector('.account-dropdown');
        
        if (accountBtn && accountDropdown) {
            accountBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleAccountDropdown(accountDropdown);
            });
            
            document.addEventListener('click', () => {
                this.hideAccountDropdown(accountDropdown);
            });
        }
    }

    toggleAccountDropdown(dropdown) {
        dropdown.classList.toggle('show');
    }

    hideAccountDropdown(dropdown) {
        dropdown.classList.remove('show');
    }

    // Wishlist Functionality
    setupWishlistFunctionality() {
        const wishlistBtn = document.querySelector('.wishlist-btn');
        const wishlistCount = document.querySelector('.wishlist-count');
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                this.showWishlist();
            });
        }
    }

    showWishlist() {
        this.showNotification('Wishlist opened! View your saved VR products.', 'info');
    }

    updateWishlistCount(count) {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = count;
            wishlistCount.style.animation = 'cartBounce 0.3s ease';
        }
    }

    // Enhanced Mobile Menu
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    toggleMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        mobileToggle.classList.toggle('active');
        
        // Create mobile menu overlay
        let mobileMenu = document.querySelector('.mobile-menu-overlay');
        
        if (!mobileMenu) {
            mobileMenu = this.createMobileMenu();
        }
        
        if (mobileToggle.classList.contains('active')) {
            mobileMenu.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('show');
            }, 10);
        } else {
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }
    }

    createMobileMenu() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = `
            <div class="mobile-menu-content">
                <div class="mobile-search">
                    <input type="text" placeholder="Search VR products...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <div class="mobile-categories">
                    <a href="#products" class="mobile-category-link">
                        <i class="fas fa-star"></i>
                        Best Sellers
                    </a>
                    <a href="#" class="mobile-category-link">
                        <i class="fas fa-plus"></i>
                        New Arrivals
                    </a>
                    <a href="#" class="mobile-category-link">
                        <i class="fas fa-tag"></i>
                        Deals
                    </a>
                    <a href="#" class="mobile-category-link">
                        <i class="fas fa-gamepad"></i>
                        VR Games
                    </a>
                    <a href="#" class="mobile-category-link">
                        <i class="fas fa-cog"></i>
                        Accessories
                    </a>
                </div>
                <div class="mobile-actions">
                    <button class="mobile-action-btn">
                        <i class="fas fa-heart"></i>
                        Wishlist
                    </button>
                    <button class="mobile-action-btn">
                        <i class="fas fa-user"></i>
                        Account
                    </button>
                    <button class="mobile-action-btn">
                        <i class="fas fa-shopping-cart"></i>
                        Cart
                    </button>
                </div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = overlay.querySelector('.mobile-menu-content');
        content.style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            width: 300px;
            height: 100%;
            background: white;
            padding: 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.toggleMobileMenu();
            }
        });
        
        return overlay;
    }

    // Scroll to Top Button
    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.style.display = 'block';
                } else {
                    scrollToTopBtn.style.display = 'none';
                }
            });
            
            // Smooth scroll to top when clicked
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Hover effects
            scrollToTopBtn.addEventListener('mouseenter', () => {
                scrollToTopBtn.style.transform = 'scale(1.1)';
            });
            
            scrollToTopBtn.addEventListener('mouseleave', () => {
                scrollToTopBtn.style.transform = 'scale(1)';
            });
        }
    }
}

// CSS Animations (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes slideDown {
        0% {
            transform: translateY(-10px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .search-input {
        border: none;
        outline: none;
        padding: 0.5rem;
        font-size: 1rem;
        flex: 1;
    }
    
    .search-close {
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .search-close:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .mobile-menu-overlay.show {
        opacity: 1;
    }
    
    .mobile-menu-overlay.show .mobile-menu-content {
        transform: translateX(0);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .mobile-search {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .mobile-search input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 6px;
    }
    
    .mobile-search button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 6px;
        cursor: pointer;
    }
    
    .mobile-categories {
        margin-bottom: 2rem;
    }
    
    .mobile-category-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        color: var(--text-dark);
        text-decoration: none;
        border-bottom: 1px solid var(--border-color);
        transition: color 0.3s ease;
    }
    
    .mobile-category-link:hover {
        color: var(--primary-color);
    }
    
    .mobile-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-action-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-light);
        border: none;
        border-radius: 8px;
        color: var(--text-dark);
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .mobile-action-btn:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: var(--shadow);
        padding: 1rem;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize the website when DOM is loaded
let vrWebsite;
document.addEventListener('DOMContentLoaded', () => {
    vrWebsite = new VRWebsite();
        // Load cart on page load
        vrWebsite.updateCartDisplay();
        vrWebsite.updateCartCount(JSON.parse(localStorage.getItem('cart') || '[]').length);
    });

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // CTA Button click effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Add mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const vrUser = document.querySelector('.vr-user');
        if (vrUser) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            vrUser.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});
