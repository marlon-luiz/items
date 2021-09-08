import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
})
export class SidebarMenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      { label: 'Listagem', routerLink: [''] },
      { label: 'Cadastro', routerLink: ['/create'] },
    ];
  }
}
