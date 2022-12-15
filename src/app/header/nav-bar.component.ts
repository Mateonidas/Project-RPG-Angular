import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBar {
  activeLink: string | null;
  background: ThemePalette = 'primary';

  constructor() {
    this.activeLink = localStorage.getItem('activeLink');
    if(this.activeLink == null) {
      this.activeLink = '/';
    }
  }

  setActiveLink(activeLink: string) {
    this.activeLink = activeLink;
    localStorage.setItem('activeLink', activeLink);
  }


}
