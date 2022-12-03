import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBar {
  activeLink = '/';
  background: ThemePalette = 'primary';
}
