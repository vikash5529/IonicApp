import {HomePage} from './../home/home';
import {LoginProvider} from './../../providers/login/login-provider';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginprovider: LoginProvider,
    public toastCtrl: ToastController
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  private buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Email and Passoword are Required',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginprovider.authenticate(this.loginForm.value).subscribe(
        result => {
          this.navCtrl.push(HomePage);
        },
        error => {
          console.error('invalid Credentials');
        }
      );
    } else {
      this.presentToast();
    }
  }
}
