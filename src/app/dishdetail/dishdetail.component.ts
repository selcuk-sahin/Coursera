import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  
  imports:[
    FormsModule
  ]

  @Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  
  formErrors = {
    'name': '',
    'comment': ''
  };

  validationMessages = {
    'name': {
      'required': 'name is required',
      'minlength': 'name must be at least 2 chars long',
      'maxlength': 'name cannot be more than 25 characters long',
    },
    'comment': {
      'required': 'comment is required',
      'minlength': 'comment must be at least 2 chars long',
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private Location: Location,
    private fb: FormBuilder) {
      this.createForm(); 
    }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.Location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2) ]],
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re) set from validation messages.
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        // clear prev. error meseage if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      name: '',
      comment: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
