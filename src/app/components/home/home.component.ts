import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
    'https://media-exp2.licdn.com/dms/image/C4D16AQG_tEZZ9Dq60Q/profile-displaybackgroundimage-shrink_350_1400/0/1628503849757?e=1661385600&v=beta&t=3SW_7GJZmozCPcv1yTO7PMsHPzdWaY1CxtbyfKe156Y',
    'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
    'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  postMessage(form: NgForm) {

  }
}
