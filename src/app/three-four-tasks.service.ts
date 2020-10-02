import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ThreeFourTasks {

    rightPassword = 'qwerty'; // Наш верный пароль
    attempts = 3; // Счетчик неверного ввода пароля

    BlockForm = new Subject<boolean>();

    constructor() { }

    // Сохранение в сторедж мейла и таймстампа
    saveTimestamp(email: string){
        let date = new Date();
        localStorage.setItem(date.getTime().toString(), email);
    }

    // Считаем кол-во неверного ввода пароля и отправка сигнала компонентам 
    // о блокировке формы и вывода сообщения о блокировке
    checkPassword(pass: string){
        if(pass !== this.rightPassword){
            this.attempts--;
            alert('Wrong password');
        }else{
            alert('Welcome!');
        }

        if(this.attempts === 0){
            this.BlockForm.next(true);
        }
    }

}
