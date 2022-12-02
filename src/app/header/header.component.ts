import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeLink = '/';
  background: ThemePalette = 'primary';
}
