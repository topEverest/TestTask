import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThreeFourTasks } from 'src/app/three-four-tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;
  pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  disableInput = false;
  message = '';

  constructor(fb: FormBuilder, private threeFourTasks: ThreeFourTasks) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.pattern(this.pattern)]],
      passwordCustomField: ['', [Validators.required, Validators.minLength(6)]]
    });


    // Блокировка формы если пароль 3 раза введен неверный пароль
    this.threeFourTasks.BlockForm
      .subscribe( res => {
        this.form.disable();
        this.disableInput = res;
      })
  }

  // Метод дает сигнал сервису если мейл подходит для записи в сторедж с таймстампом
  // P.S. Непонял когда именно нужно сохранять таймстамп. 
  // В задании написано "когда пользователь вводит мейл соответствующий паттерну" потому сделал так
  // Но если нужно после отправки формы то сделал бы это в методе submit(){} при клике на сабмит-кнопку
  onChangesEmail(event: any) {
    if(event.match(this.pattern)){
      this.threeFourTasks.saveTimestamp(event);
    }
  }

  // Метод отправляет сервису пароль для проверки верен ли он. Верный пароль "qwerty"
  checkPassword() {
    this.threeFourTasks.checkPassword(this.form.get('passwordCustomField').value);
  }

}
