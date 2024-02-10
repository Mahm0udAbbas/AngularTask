import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  userRegisterForm: FormGroup;
  // registerForm: FormGroup;
  constructor() {
    this.userRegisterForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,15}$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,15}@(yahoo|gmail).com$'),
      ]),
      password: new FormControl('', [Validators.required]),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
      }),
      phones: new FormArray([new FormControl('', [])]),
    });
    //   this.registerForm = this.fb.group({
    //     name: ['', [Validators.pattern('^[a-zA-Z]{3,15}$'), Validators.required]],
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    //     address: this.fb.group({
    //       city: ['', Validators.required],
    //       street: ['', Validators.required],
    //     }),
    //   });
    // }
  }
  OnSubmit() {
    console.log(this.userRegisterForm.value);
  }
  get getName() {
    return this.userRegisterForm.get('name');
  }
  get getEmail() {
    return this.userRegisterForm.get('email');
  }
  get getPass() {
    return this.userRegisterForm.get('password');
  }
  get getCity() {
    return this.userRegisterForm.get('address')?.get('city');
  }
  get getStNo() {
    return this.userRegisterForm.get('address')?.get('street');
  }

  get phones() {
    return this.userRegisterForm.get('phones') as FormArray;
  }
  addPhoneNo() {
    this.phones.push(new FormControl(''));
  }
  deletePhoneNo(i: number) {
    this.phones.removeAt(i);
  }
}
