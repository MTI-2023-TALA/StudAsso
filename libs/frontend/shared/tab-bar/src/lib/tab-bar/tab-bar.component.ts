import { ActivatedRoute, Data } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { TabBarItem } from './tab-bar.model';

@Component({
  selector: 'stud-asso-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {
  @Input() tabBarItems: TabBarItem[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.tabBarItems = data['tabBarItems'];
    });
  }
}
