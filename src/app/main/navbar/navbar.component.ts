import { AuthService } from '../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { UpdateValueService } from '../../shared/updateValue.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private updateValues: UpdateValueService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onGetServerData(){
    this.updateValues.getServerData();
  }

  onUpdateServerData(){
    this.updateValues.updateServerData();
  }
}
