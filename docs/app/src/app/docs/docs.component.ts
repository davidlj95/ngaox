import { AfterViewChecked, Component } from '@angular/core';
import { IconsService } from '@ngaox/icons';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'docs-entry',
  template: ` <p>docs works!</p> `,
  styles: [``]
})
export class DocsComponent implements AfterViewChecked {
  constructor(private highlightService: HighlightService, icons: IconsService) {
    icons.addByUrl('assets/my-icon.svg', 'my-icon');
    icons.remove('ugly-icon');
    icons.add(
      'linkedIn-icon',
      `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path d=\"M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5C4,12,5.736,14,8.421,14z M4,17h9v26H4V17z M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v26h9V28l0,0c0-2.209,1.791-4,4-4s4,1.791,4,4v15h9C44,43,44,27.955,44,26.5z\"/></svg>`
    );
    icons.get('linkedIn-icon')?.subscribe(svg => {
      console.log(svg);
    });
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
