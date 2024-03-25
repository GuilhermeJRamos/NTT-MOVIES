import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../shared/services/omdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  users:any;
  binding! :string;
  constructor(private user:OmdbService) { }
  
  ngOnInit(): void {
  }
  
  getValue(){
    this.user.getData(this.binding).subscribe((data)=>{
        this.users=data;
        console.log(this.users);
      })
  }
}