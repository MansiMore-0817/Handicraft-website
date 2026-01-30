// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE HAMBURGER MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileActionBtns = document.querySelectorAll('.mobile-action-btn');

    function closeMobileMenu() {
        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('show');
            mobileMenu.style.display = 'none';
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.pointerEvents = 'none';
            mobileMenu.style.zIndex = '-1';
        }
    }

    function openMobileMenu() {
        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.classList.add('active');
            mobileMenu.classList.add('show');
            mobileMenu.style.display = 'block';
            mobileMenu.style.visibility = 'visible';
            mobileMenu.style.opacity = '1';
            mobileMenu.style.pointerEvents = 'auto';
            mobileMenu.style.zIndex = '999';
        }
    }

    // FORCE CLOSE ON PAGE LOAD
    closeMobileMenu();

    if (hamburgerBtn && mobileMenu) {
        // Toggle mobile menu
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (mobileMenu.classList.contains('show')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // FORCE CLOSE on nav link clicks
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMobileMenu();
                // Allow navigation to proceed
            });
        });

        // FORCE CLOSE on action button clicks
        mobileActionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // FORCE CLOSE before page navigation
    window.addEventListener('beforeunload', function() {
        closeMobileMenu();
    });

    // FORCE CLOSE on page show (back/forward navigation)
    window.addEventListener('pageshow', function() {
        closeMobileMenu();
    });

    // FORCE CLOSE on focus/visibility change
    window.addEventListener('focus', function() {
        closeMobileMenu();
    });

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            closeMobileMenu();
        }
    });
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
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

// ===== PRODUCT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PRODUCT SORTING =====
const sortSelect = document.querySelector('.sort-select');
const productGrid = document.querySelector('.product-grid');

sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const products = Array.from(productCards);
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
        
        switch (sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'newest':
                // Assuming newer products have higher data-id
                return parseInt(b.dataset.id || 0) - parseInt(a.dataset.id || 0);
            default:
                return 0;
        }
    });
    
    // Re-append sorted products
    products.forEach(product => {
        productGrid.appendChild(product);
    });
});

// ===== WISHLIST FUNCTIONALITY =====
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const wishlistBadge = document.querySelector('.wishlist-btn .badge');
let wishlistCount = 0;

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#e74c3c';
            wishlistCount++;
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
            wishlistCount--;
        }
        
        wishlistBadge.textContent = wishlistCount;
    });
});

// ===== CART FUNCTIONALITY =====
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartBadge = document.querySelector('.cart-btn .badge');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartBadge.textContent = cartCount;
        
        // Add animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Show success message (you can customize this)
        showNotification('Product added to cart!');
    });
});

// ===== QUICK VIEW MODAL =====
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
const modal = document.getElementById('quickViewModal');
const modalClose = document.querySelector('.modal-close');

// Product data (in a real app, this would come from a database)
const productData = {
    'blue-vase': {
        title: 'Blue Pottery Vase',
        origin: 'Handcrafted in Jaipur',
        price: '$89.99',
        image: 'images/blue-vase.jpg',
        rating: 5,
        description: 'This exquisite blue pottery vase showcases the traditional craftsmanship of Jaipur artisans. Made with natural clay and painted with intricate patterns using traditional techniques passed down through generations.'
    },
    'banarasi-saree': {
        title: 'Banarasi Silk Saree',
        origin: 'Woven in Varanasi',
        price: '$299.99',
        image: 'images/banarasi-saree.jpg',
        rating: 5,
        description: 'A masterpiece of Indian textile artistry, this Banarasi silk saree features intricate gold thread work and traditional motifs. Each saree takes weeks to complete and represents centuries of weaving tradition.'
    },
    'brass-decor': {
        title: 'Brass Decor Piece',
        origin: 'Crafted in Moradabad',
        price: '$149.99',
        image: 'images/brass-decor.jpg',
        rating: 4,
        description: 'This elegant brass decorative piece showcases the metalworking expertise of Moradabad craftsmen. Hand-engraved with traditional patterns, it adds a touch of Indian heritage to any space.'
    }
};

quickViewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        const product = productData[productId];
        
        if (product) {
            document.getElementById('modalProductImage').src = product.image;
            document.getElementById('modalProductTitle').textContent = product.title;
            document.getElementById('modalProductOrigin').textContent = product.origin;
            document.getElementById('modalProductPrice').textContent = product.price;
            document.getElementById('modalProductDescription').textContent = product.description;
            
            // Set rating stars
            const ratingContainer = document.getElementById('modalProductRating');
            ratingContainer.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < product.rating ? 'fas fa-star' : 'far fa-star';
                ratingContainer.appendChild(star);
            }
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// ===== NEWSLETTER SUBSCRIPTION =====
const subscribeForm = document.querySelector('.subscribe-form');
const successMessage = document.getElementById('newsletter-success');

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        subscribeForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            subscribeForm.style.display = 'block';
            successMessage.classList.remove('show');
            subscribeForm.reset();
        }, 3000);
    }, 1000);
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LOAD MORE PRODUCTS =====
const loadMoreButton = document.querySelector('.load-more-btn');
let productsLoaded = 3;

loadMoreButton.addEventListener('click', () => {
    // Simulate loading more products
    loadMoreButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        // In a real app, you would fetch more products from an API
        showNotification('No more products to load');
        loadMoreButton.innerHTML = '<span>Load More Products</span><i class="fas fa-chevron-down"></i>';
    }, 1500);
});

// ===== CATEGORY CARD INTERACTIONS =====
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        // Scroll to products section and filter by category
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            const filterButton = document.querySelector(`[data-filter="${category}"]`);
            if (filterButton) {
                filterButton.click();
            }
        }, 1000);
    });
});

// ===== ARTISAN VIDEO PLAY BUTTON =====
const playButton = document.querySelector('.play-button');

playButton.addEventListener('click', () => {
    // In a real app, this would open a video modal or redirect to a video page
    showNotification('Video feature coming soon!');
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== SEARCH FUNCTIONALITY =====
const searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', () => {
    // In a real app, this would open a search modal or redirect to search page
    showNotification('Search feature coming soon!');
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

console.log('ArtisanCraft India website loaded successfully! 🎨');

// ===== ADVANCED FEATURES =====

// ===== PRODUCT COMPARISON =====
let comparisonList = [];
const maxComparison = 3;

function addToComparison(productId) {
    if (comparisonList.length < maxComparison && !comparisonList.includes(productId)) {
        comparisonList.push(productId);
        updateComparisonUI();
        showNotification(`Product added to comparison (${comparisonList.length}/${maxComparison})`);
    } else if (comparisonList.includes(productId)) {
        showNotification('Product already in comparison', 'error');
    } else {
        showNotification(`Maximum ${maxComparison} products can be compared`, 'error');
    }
}

function updateComparisonUI() {
    // Update comparison counter in UI
    const comparisonCounter = document.querySelector('.comparison-counter');
    if (comparisonCounter) {
        comparisonCounter.textContent = comparisonList.length;
    }
}

// ===== RECENTLY VIEWED PRODUCTS =====
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

function addToRecentlyViewed(productId) {
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    // Add to beginning
    recentlyViewed.unshift(productId);
    // Keep only last 5 items
    recentlyViewed = recentlyViewed.slice(0, 5);
    // Save to localStorage
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// ===== PRICE RANGE FILTER =====
function createPriceRangeFilter() {
    const filterBar = document.querySelector('.filter-bar');
    const priceFilter = document.createElement('div');
    priceFilter.className = 'price-filter';
    priceFilter.innerHTML = `
        <label for="priceRange">Price Range: $<span id="priceValue">0</span> - $500</label>
        <input type="range" id="priceRange" min="0" max="500" value="500" class="price-slider">
    `;
    
    filterBar.appendChild(priceFilter);
    
    const priceSlider = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    priceSlider.addEventListener('input', (e) => {
        const maxPrice = parseInt(e.target.value);
        priceValue.textContent = maxPrice;
        
        productCards.forEach(card => {
            const price = parseFloat(card.querySelector('.current-price').textContent.replace('$', ''));
            if (price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== PRODUCT ZOOM FUNCTIONALITY =====
function addImageZoom() {
    const productImages = document.querySelectorAll('.product-image img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.cursor = 'zoom-in';
        });
        
        img.addEventListener('click', function() {
            createImageZoomModal(this.src, this.alt);
        });
    });
}

function createImageZoomModal(src, alt) {
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <div class="zoom-overlay">
            <img src="${src}" alt="${alt}" class="zoom-image">
            <button class="zoom-close">&times;</button>
        </div>
    `;
    
    // Add styles
    zoomModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: zoom-out;
    `;
    
    const zoomImage = zoomModal.querySelector('.zoom-image');
    zoomImage.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const closeBtn = zoomModal.querySelector('.zoom-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
    `;
    
    document.body.appendChild(zoomModal);
    document.body.style.overflow = 'hidden';
    
    // Close functionality
    const closeZoom = () => {
        document.body.removeChild(zoomModal);
        document.body.style.overflow = '';
    };
    
    zoomModal.addEventListener('click', closeZoom);
    closeBtn.addEventListener('click', closeZoom);
    
    // Prevent closing when clicking on image
    zoomImage.addEventListener('click', (e) => e.stopPropagation());
}

// ===== PRODUCT REVIEWS SYSTEM =====
const productReviews = {
    'blue-vase': [
        { name: 'Priya S.', rating: 5, comment: 'Beautiful craftsmanship! Exactly as described.', date: '2024-01-15' },
        { name: 'Raj M.', rating: 5, comment: 'Excellent quality and fast shipping.', date: '2024-01-10' }
    ],
    'banarasi-saree': [
        { name: 'Meera K.', rating: 5, comment: 'Stunning saree! The gold work is exquisite.', date: '2024-01-12' },
        { name: 'Anita R.', rating: 4, comment: 'Good quality but took longer to deliver.', date: '2024-01-08' }
    ]
};

function showProductReviews(productId) {
    const reviews = productReviews[productId] || [];
    const reviewsHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <strong>${review.name}</strong>
                <div class="review-rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');
    
    return reviewsHTML;
}

// ===== CURRENCY CONVERTER =====
const currencies = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    INR: 83.12,
    CAD: 1.35
};

let currentCurrency = 'USD';

function createCurrencySelector() {
    const headerActions = document.querySelector('.header-actions');
    const currencySelector = document.createElement('select');
    currencySelector.className = 'currency-selector';
    currencySelector.innerHTML = Object.keys(currencies).map(currency => 
        `<option value="${currency}" ${currency === currentCurrency ? 'selected' : ''}>${currency}</option>`
    ).join('');
    
    currencySelector.style.cssText = `
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        font-size: 14px;
        margin-right: 10px;
    `;
    
    currencySelector.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updatePrices();
    });
    
    headerActions.insertBefore(currencySelector, headerActions.firstChild);
}

function updatePrices() {
    const priceElements = document.querySelectorAll('.current-price, .original-price');
    priceElements.forEach(element => {
        const usdPrice = parseFloat(element.dataset.usdPrice || element.textContent.replace('$', ''));
        if (!element.dataset.usdPrice) {
            element.dataset.usdPrice = usdPrice;
        }
        
        const convertedPrice = (usdPrice * currencies[currentCurrency]).toFixed(2);
        const currencySymbol = currentCurrency === 'USD' ? '$' : 
                              currentCurrency === 'EUR' ? '€' : 
                              currentCurrency === 'GBP' ? '£' : 
                              currentCurrency === 'INR' ? '₹' : 
                              currentCurrency + ' ';
        
        element.textContent = currencySymbol + convertedPrice;
    });
}

// ===== INITIALIZE ADVANCED FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize advanced features
    createPriceRangeFilter();
    addImageZoom();
    createCurrencySelector();
    
    // Add to recently viewed when quick view is opened
    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            addToRecentlyViewed(productId);
        });
    });
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Log performance metrics
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

console.log('Advanced features loaded successfully! 🚀');
// ===== NEW PAGE FUNCTIONALITY =====

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                formSuccess.classList.remove('show');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });
}

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== ANIMATED COUNTERS FOR STATS =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// ===== INTERSECTION OBSERVER FOR COUNTER ANIMATION =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.impact-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== JOIN COMMUNITY CTA BUTTONS =====
const ctaButtons = document.querySelectorAll('.cta-btn');

ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.querySelector('span').textContent;
        
        // Simulate different actions based on button text
        switch(buttonText) {
            case 'Submit Your Craft':
                showNotification('Craft submission form will open soon!', 'info');
                break;
            case 'Find Opportunities':
                showNotification('Opportunity matching system coming soon!', 'info');
                break;
            case 'Post an Opportunity':
                showNotification('Team building platform launching soon!', 'info');
                break;
            case 'Join the Community':
                showNotification('Community registration opening soon!', 'info');
                break;
            default:
                showNotification('Feature coming soon!', 'info');
        }
    });
});

// ===== ENHANCED NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fa-check-circle';
    let bgColor = '#28a745';
    
    switch(type) {
        case 'info':
            icon = 'fa-info-circle';
            bgColor = '#17a2b8';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            bgColor = '#ffc107';
            break;
        case 'error':
            icon = 'fa-exclamation-circle';
            bgColor = '#dc3545';
            break;
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== FORM VALIDATION ENHANCEMENTS =====
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Add error styling
    field.style.borderColor = '#dc3545';
    
    // Show error message
    let errorMsg = field.parentElement.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = `
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 4px;
        `;
        field.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PAGE-SPECIFIC INITIALIZATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page-specific features based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'contact.html':
            console.log('Contact page loaded - Form validation active');
            break;
        case 'about.html':
            console.log('About page loaded - Counter animations ready');
            break;
        case 'join-community.html':
            console.log('Join Community page loaded - CTA buttons active');
            break;
        default:
            console.log(`${currentPage} loaded successfully`);
    }
});

console.log('Enhanced website functionality loaded! 🚀');

// ===== DARK MODE FUNCTIONALITY =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const iconClass = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    if (themeIcon) themeIcon.className = iconClass;
    if (themeIconMobile) themeIconMobile.className = iconClass;
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const iconClass = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    [themeIcon, themeIconMobile].forEach(icon => {
        if (icon) {
            icon.style.transform = 'scale(0.8)';
            setTimeout(() => {
                icon.className = iconClass;
                icon.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}