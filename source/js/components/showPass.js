const forms = document.querySelectorAll('.pass-form');
forms && forms.forEach(function(form) {
    const labels = form.querySelectorAll('.pass-form__label');

    labels.forEach(function(label) {
        const passwordInput = label.querySelector('.pass-form__input');
        const dotsSpan = label.querySelector('.pass-form__dots');
        const btn = label.querySelector('.pass-form__icon');
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const isActive = passwordInput.type === 'password';
            passwordInput.type = isActive ? 'text' : 'password';
            [btn, passwordInput, dotsSpan].forEach(element => element.classList.toggle('active', isActive));
        });

        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const dotsCount = Math.max(0, 17 - password.length);
            const dots = '–'.repeat(dotsCount);
            
            [passwordInput, dotsSpan].forEach(element => {
                element.classList.toggle('full', password.length === 17);
                element.classList.toggle('invalid', /[^a-zA-Z0-9]/.test(password));
            });

            dotsSpan.textContent = dots;
            
            if (password.length <= 17) {
                const visiblePassword = password.slice(0, 17);
                dotsSpan.textContent = visiblePassword.replace(/./g, '–');
            }
        });
    });
});

const mainForms = document.querySelectorAll('.main-form');

mainForms && mainForms.forEach(function(form) {
    const labels = form.querySelectorAll('.main-form__label');

    labels.forEach(function(label) {
        const passwordInput = label.querySelector('.main-form__input');
        const btn = label.querySelector('.main-form__show');
    
        if(btn){
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = passwordInput.type === 'password';
                passwordInput.type = isActive ? 'text' : 'password';
                btn.classList.toggle('active', isActive);
            });
        }
    })
})