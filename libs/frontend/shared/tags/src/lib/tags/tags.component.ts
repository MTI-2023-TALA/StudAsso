import { Component, Input } from '@angular/core';

import { TagsType } from './tags.model';

@Component({
  selector: 'stud-asso-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  TagsType: typeof TagsType = TagsType;
  @Input()
  type = 'default';
  @Input()
  message = 'Ceci est un tag';
}
