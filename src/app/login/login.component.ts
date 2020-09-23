import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imports:[
    FormsModule
  ]

  user = {username: '', password: '', remember: false};
  
  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();
  }

}
