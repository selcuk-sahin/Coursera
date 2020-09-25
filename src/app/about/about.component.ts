import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  leaders: Leader[];

  constructor(private leaderservice: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
    this.leaderservice.getLeaders()
    .subscribe((leaders) => this.leaders = leaders);
  }

}