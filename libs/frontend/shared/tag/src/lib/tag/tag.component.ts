import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TagType } from './tag.model';

@Component({
  selector: 'stud-asso-tags',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  TagType: typeof TagType = TagType;
  @Input() type: string = TagType.Default;
  @Input() message = 'Ceci est un tag';
  @Input() value = '';
  @Input() icon = 'x';
  @Input() shouldDisplayIcon = false;
  @Output() iconClicked = new EventEmitter<string>();

  public onClickCross() {
    this.iconClicked.emit(this.value);
  }
}
