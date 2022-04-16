import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarIconsList = [
    {
      name: 'hero-home',
      text: 'Home',
    },
    {
      name: 'hero-hashtag',
      text: 'explore',
    },
    {
      name: 'hero-bell',
      text: 'notifications',
    },
    {
      name: 'hero-inbox',
      text: 'Messages',
    },
    {
      name: 'hero-bookmark',
      text: 'Bookmarks',
    },
    {
      name: 'hero-user',
      text: 'Profile',
    },
    // {
    //   name: 'hero-clipboard-list',
    //   text: 'Lists',
    // },
    {
      name: 'hero-dots-circle-horizontal',
      text: 'More',
    },
    // {
    //   name: 'hero-dots-horizontal',
    //   text: 'More',
    // },
  ];
  constructor() {}

  ngOnInit(): void {}
}
