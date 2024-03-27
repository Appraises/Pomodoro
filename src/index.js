class PomodoroClock {
    constructor() {
        document.addEventListener('click', e => {
            const el = e.target;
            if (el.classList.contains('inicia')) {
                this.iniciaContador()
            } else if (el.classList.contains('proxima-pausa') && this.numberFocus < 4) {
                this.goToPause()
            } else if (el.classList.contains('proxima-pausa') && this.numberFocus === 4) { 
                this.goToLongPause()
            } else if (el.classList.contains('proximo-foco')) {
                this.goToFocus()
            }
        })
        
        this.backgroundColor = document.body; 
        this.backgroundSection = document.querySelector('.pomodoro')
        this.next = document.querySelector('.next')
        this.timer = document.querySelector('.timer')
        this.interval = null; 
        this.startTime = null; 
        this.duration = 25 * 60; 
        this.buttonStart = document.querySelector('.inicia')
        this.focusDiv = document.querySelector('.foco')
        this.shortPauseDiv = document.querySelector('.pausa-curta')
        this.longPauseDiv = document.querySelector('.pausa-longa')
        this.numberFocus = 1;
        this.sound = new Audio('/ringtone-1-46486.mp3')
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    }

    iniciaContador() {
        clearInterval(this.interval); 
        this.startTime = Date.now(); 
        this.interval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); 
            const tempoRestante = this.duration - elapsedTime; 
            this.timer.innerHTML = this.formatTime(tempoRestante);
            if (tempoRestante <= 0 && this.numberFocus != 4) {
                clearInterval(this.interval)
                this.sound.play()
                this.goToPause()
            } else if (tempoRestante <= 0 && this.numberFocus === 4) {
                clearInterval(this.interval)
                this.sound.play()
                this.goToLongPause()
            }
        }, 1000);
    }

    goToPause() {
        clearInterval(this.interval)
        this.next.classList.remove('proxima-pausa')
        this.next.classList.add('proximo-foco')
        this.timer.innerHTML = '05:00';
        this.duration = 5 * 60;
        this.backgroundColor.style.backgroundColor = '#59a5d8';
        this.backgroundColor.style.transition = 'background-color 1s ease-in-out'; 
        this.backgroundSection.style.backgroundColor = '#64b5f6';
        this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out'; 
        this.buttonStart.style.color = '#59a5d8';
        this.buttonStart.style.transition = 'color 1.3s ease-in-out';
        this.focusDiv.classList.remove('ativo-foco')
        this.shortPauseDiv.classList.add('ativo-pausa')
        this.shortPauseDiv.style.transition = 'background-color 1.3s ease-in-out';
        if (this.timer.innerHTML === '00:00') {
            this.sound.play()
            vaiProFoco()
        }
    }

    goToLongPause() {
        console.log('vai pra pausa longa')
        this.numberFocus = 0;
        this.next.classList.remove('proxima-pausa')
        this.next.classList.add('proximo-foco')
        this.timer.innerHTML = '15:00';
        this.duration = 15 * 60;
        this.backgroundColor.style.backgroundColor = '#59a5d8';
        this.backgroundColor.style.transition = 'background-color 1s ease-in-out'; 
        this.backgroundSection.style.backgroundColor = '#64b5f6';
        this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out'; 
        this.buttonStart.style.color = '#59a5d8';
        this.buttonStart.style.transition = 'color 1.3s ease-in-out'; 
        this.focusDiv.classList.remove('ativo-foco')
        this.longPauseDiv.classList.add('ativo-pausa')
        this.longPauseDiv.style.transition = 'background-color 1.3s ease-in-out';
        if (this.timer.innerHTML === '00:00') {
            this.sound.play()
            goTiFocus()
        }
    }

    goToFocus() {
        if (this.numberFocus === 0) {
            this.longPauseDiv.classList.remove('ativo-pausa')
        }
        this.numberFocus++;
        console.log(this.numberFocus)
        clearInterval(this.interval)
        this.next.classList.remove('proximo-foco')
        this.next.classList.add('proxima-pausa')
        this.timer.innerHTML = '25:00'
        this.duration = 25 * 60;
        this.focusDiv.style.transition = 'background-color 1.3s ease-in-out'; 
        this.shortPauseDiv.classList.remove('ativo-pausa')
        this.focusDiv.classList.add('ativo-foco')
        this.backgroundColor.style.backgroundColor = '#B93F3F';
        this.backgroundColor.style.transition = 'background-color 1s ease-in-out'; 
        this.backgroundSection.style.backgroundColor = '#CE6161';
        this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out'; 
        this.buttonStart.style.color = '#B93F3F';
        this.buttonStart.style.transition = 'color 1.3s ease-in-out'; 
        console.log('a')
    }
}

new PomodoroClock();
