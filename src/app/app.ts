import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ColorPickerComponent } from './components/color-picker/color-picker';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matMenu, matClose } from '@ng-icons/material-icons/baseline';

interface MenuItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ColorPickerComponent, NgIcon],
  providers: [provideIcons({ matMenu, matClose })],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  menuItems: MenuItem[] = [
    { label: 'Introduction', url: '/' },
    { label: 'Todos', url: '/todos' },
    { label: 'Datapass', url: '/datapass' },
  ];

  menuIsOpen = signal(false);
  menu_open(isOpen: boolean) {
    this.menuIsOpen.set(isOpen);
  }
}
