/**
 * AllHalal / HalalScan - Form Validation
 * Handles contact form validation and submission
 */

(function() {
    'use strict';
    
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        return; // Exit if contact form doesn't exist on this page
    }
    
    const formSuccess = document.getElementById('formSuccess');
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Error messages
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // ========================================
    // Validation Functions
    // ========================================
    
    /**
     * Validate name field
     * @returns {boolean}
     */
    function validateName() {
        const value = nameField.value.trim();
        
        if (value === '') {
            showError(nameField, nameError, 'Please enter your name');
            return false;
        }
        
        if (value.length < 2) {
            showError(nameField, nameError, 'Name must be at least 2 characters');
            return false;
        }
        
        hideError(nameField, nameError);
        return true;
    }
    
    /**
     * Validate email field
     * @returns {boolean}
     */
    function validateEmail() {
        const value = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailField, emailError, 'Please enter your email address');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(emailField, emailError, 'Please enter a valid email address');
            return false;
        }
        
        hideError(emailField, emailError);
        return true;
    }
    
    /**
     * Validate subject field
     * @returns {boolean}
     */
    function validateSubject() {
        const value = subjectField.value;
        
        if (value === '') {
            showError(subjectField, subjectError, 'Please select a subject');
            return false;
        }
        
        hideError(subjectField, subjectError);
        return true;
    }
    
    /**
     * Validate message field
     * @returns {boolean}
     */
    function validateMessage() {
        const value = messageField.value.trim();
        
        if (value === '') {
            showError(messageField, messageError, 'Please enter your message');
            return false;
        }
        
        if (value.length < 10) {
            showError(messageField, messageError, 'Message must be at least 10 characters');
            return false;
        }
        
        hideError(messageField, messageError);
        return true;
    }
    
    /**
     * Show error message
     * @param {HTMLElement} field
     * @param {HTMLElement} errorElement
     * @param {string} message
     */
    function showError(field, errorElement, message) {
        field.style.borderColor = '#FF3B30';
        errorElement.textContent = message;
        errorElement.classList.add('active');
        field.setAttribute('aria-invalid', 'true');
    }
    
    /**
     * Hide error message
     * @param {HTMLElement} field
     * @param {HTMLElement} errorElement
     */
    function hideError(field, errorElement) {
        field.style.borderColor = '#D1D1D6';
        errorElement.classList.remove('active');
        field.setAttribute('aria-invalid', 'false');
    }
    
    // ========================================
    // Real-time Validation (on blur)
    // ========================================
    
    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    subjectField.addEventListener('blur', validateSubject);
    messageField.addEventListener('blur', validateMessage);
    
    // Clear error on input
    nameField.addEventListener('input', function() {
        if (nameError.classList.contains('active')) {
            validateName();
        }
    });
    
    emailField.addEventListener('input', function() {
        if (emailError.classList.contains('active')) {
            validateEmail();
        }
    });
    
    subjectField.addEventListener('change', function() {
        if (subjectError.classList.contains('active')) {
            validateSubject();
        }
    });
    
    messageField.addEventListener('input', function() {
        if (messageError.classList.contains('active')) {
            validateMessage();
        }
    });
    
    // ========================================
    // Form Submission
    // ========================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // If all valid, proceed with submission
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            submitForm();
        } else {
            // Focus on first invalid field
            if (!isNameValid) {
                nameField.focus();
            } else if (!isEmailValid) {
                emailField.focus();
            } else if (!isSubjectValid) {
                subjectField.focus();
            } else if (!isMessageValid) {
                messageField.focus();
            }
        }
    });
    
    /**
     * Submit form (mock submission for now)
     * In production, this would send data to a backend endpoint
     */
    function submitForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        
        // Collect form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            subject: subjectField.value,
            message: messageField.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Mock API call (replace with actual endpoint in production)
        setTimeout(function() {
            // Simulate successful submission
            console.log('Form submitted:', formData);
            
            // Show success message
            formSuccess.classList.add('active');
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.classList.remove('active');
            }, 5000);
            
            // In production, you would send data to your backend:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                formSuccess.classList.add('active');
                contactForm.reset();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                alert('An error occurred. Please try again or email us directly at info@gezellix.com');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
            */
            
        }, 1500); // Simulate network delay
    }
    
    // ========================================
    // Accessibility: Form Labels
    // ========================================
    
    // Ensure labels are properly associated
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(function(group) {
        const label = group.querySelector('label');
        const input = group.querySelector('input, select, textarea');
        
        if (label && input && !input.hasAttribute('aria-labelledby')) {
            const labelId = label.id || 'label-' + input.id;
            label.id = labelId;
            input.setAttribute('aria-labelledby', labelId);
        }
    });
    
    // ========================================
    // Character Count for Message Field (Optional)
    // ========================================
    
    const messageCounter = document.createElement('div');
    messageCounter.style.cssText = 'text-align: right; color: #6C6C70; font-size: 0.875rem; margin-top: 4px;';
    messageField.parentNode.appendChild(messageCounter);
    
    function updateCharacterCount() {
        const length = messageField.value.length;
        messageCounter.textContent = length + ' characters';
        
        if (length < 10) {
            messageCounter.style.color = '#FF3B30';
        } else {
            messageCounter.style.color = '#6C6C70';
        }
    }
    
    messageField.addEventListener('input', updateCharacterCount);
    updateCharacterCount(); // Initial count
    
})();

