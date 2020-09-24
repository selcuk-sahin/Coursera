import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish: Dish;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private Location: Location) { }

  ngOnInit(): void {
  let id = this.route.snapshot.params['id'];
    this.dishService.getDishbyId(id)
    .then(dish => this.dish = dish);
  }

  goBack(): void {
    this.Location.back();
  }

}
