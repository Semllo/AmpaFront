import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
        console.log(window.location.href)
        if(('http://ampaiesjaumeprimer.es/inici' == window.location.href) || ('http://ampaiesjaumeprimer.es' == window.location.href))
        window.location.href = 'https://ampaiesjaumeprimer.es';

  }

}
