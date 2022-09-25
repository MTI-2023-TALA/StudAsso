import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TagsType } from './tags.model';

@Component({
  selector: 'stud-asso-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  TagsType: typeof TagsType = TagsType;
  @Input() type: string = TagsType.Default;
  @Input() message = 'Ceci est un tag';
  @Input() value = '';
  @Input() icon = 'x';
  @Input() shouldDisplayIcon = false;
  @Output() iconClicked = new EventEmitter<string>();

  public onClickCross() {
    this.iconClicked.emit(this.value);
  }
}
