export function getValueBet(input, btns) {
    if (!btns) return;

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const betValue = btn.getAttribute('data-bet');

            switch (betValue) {
                case 'clear':
                    input.value = 0;
                    break;
                case '1/2':
                    input.value /= 2;
                    break;
                case '2x':
                    input.value *= 2;
                    break;
                case 'min':
                    input.value = 10;
                    break;
                case 'max':
                    input.value = 100000;
                    break;
                default:
                    input.value = +input.value + +betValue;
            }
        });
    });
}
