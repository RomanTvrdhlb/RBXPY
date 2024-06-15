const editBoxes = document.querySelectorAll('.edit-box');

if(editBoxes){
    editBoxes.forEach((editBox) => {
        const trigger = editBox.querySelector('.edit-box__btn');
        const input = editBox.querySelector('input[type="text"]');
        const saveButton = editBox.querySelector('.edit-box__trigger');
        const nav = editBox.querySelector('.edit-box__label');
        const name = editBox.querySelector('.edit-box__name');
      
          let originalValue = input.value;
      
          trigger.addEventListener('click', () => {
            if(editBox.classList.contains('active')){
                editBox.classList.remove('active');
                nav.style.maxHeight = '0';
                return
            }
            editBox.classList.add('active');
            nav.style.maxHeight = nav.scrollHeight + 'px';
          });
      
          saveButton.addEventListener('click', () => {
            editBox.classList.remove('active');
            originalValue = input.value;
            nav.style.maxHeight = '0';
            if(originalValue === ''){
                return
            }
            name.innerHTML = originalValue;
          });
      });
}

