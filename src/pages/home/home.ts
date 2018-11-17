import {LoginPage} from './../login/login';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public editForm: FormGroup;
  showAddForm: boolean;
  showusers: boolean;
  public userData: Array<userModel> = [];
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.buildForm();
  }
  ionViewDidLoad() {
    this.storage.get('userData').then(value => {
      if (value) {
        this.userData = value;
        this.showusers = !this.showusers;
      }
    });
  }
  onSubmit() {
    if (this.editForm.invalid) {
      this.presentToast();
    } else if (this.editForm.valid) {
      this.userData.push(this.editForm.value);
      this.showAddForm = !this.showAddForm;
      this.showusers = true;
    }
  }

  onAdd() {
    this.showAddForm = !this.showAddForm;
    this.buildForm();
    this.showusers = !this.showusers;
  }

  onEdit(index) {
    const user = this.userData[index];
    console.log(user);
    this.userData.splice(index, 1);
    this.updateForm(user);
    this.editForm.updateValueAndValidity();
    this.showAddForm = !this.showAddForm;
    this.showusers = false;
  }
  private buildForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      licenseNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required]),
      licenseexpirationDate: new FormControl('', [Validators.required])
    });
  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Kindly fill all the feilds are Required ',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  public updateForm(data) {
    console.log(data);
    this.buildForm();
    this.editForm.patchValue({
      firstName: data['firstName'],
      lastName: data['lastName'],
      dob: data['dob'],
      licenseNo: data['licenseNo'],
      email: data['email'],
      phoneNo: data['phoneNo'],
      licenseexpirationDate: data['licenseexpirationDate']
    });
  }
  onLogOut() {
    this.navCtrl.push(LoginPage);
  }
  ionViewWillLeave() {
    this.storage.set('userData', this.userData);
  }
}

interface userModel {
  id: number;
  firstName: string;
  lastName: String;
  dob: string;
  email: string;
  phoneNo: string;
  licenseNo: string;
  licenseexpirationDate: string;
}
