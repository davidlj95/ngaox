import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class IconsService {
  private icons = new Map<string, SVGElement>();
  private lazyIcons = new Map<string, Observable<SVGElement>>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  private textToSvgElement(svg: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = svg;
    const svgEl = div.querySelector('svg') as SVGElement;
    svgEl.removeAttribute('style');
    svgEl.removeAttribute('class');
    svgEl.setAttribute('fill', 'currentColor');
    return svgEl;
  }

  /**
   * get an already registered/added icon
   *
   * @see  {@link IconsService.add} & {@link IconsService.addByUrl}
   */
  get(name: string): Observable<SVGElement | undefined> | undefined {
    if (this.icons.has(name)) {
      return of(this.icons.get(name));
    } else if (this.lazyIcons.has(name)) {
      return this.lazyIcons.get(name);
    }
    return throwError(`Svg with name '${name}' has not been added`);
  }

  getFallbackIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    `;
  }

  /**
   * Add an SVG icon to the registry with an alias `name`
   *
   * pass to it a `name` for the icon and the `svg` element
   * you can pass also a boolean value `override` (default to false) whether or not replacing existing `svg` if `name` already exists
   *
   * @see {@link IconsService.addByUrl}
   */
  add(name: string, svg: string, override: boolean = false) {
    if (override || !this.icons.has(name)) {
      this.icons.set(name, this.textToSvgElement(svg));
    } else if (this.icons.has(name)) {
      throw new Error(
        'svg icon name already used!!\nset override argument to true if you want to replace its content.'
      );
    }
  }

  /**
   * Add an SVG icon to the registry via a `url` with an alias `name` (default to `url`)
   *
   * you can pass also a boolean value `override` (default to false) whether or not replacing existing `svg` if `name` already exists
   *
   * @see {@link IconsService.add}
   */
  async addByUrl(url: string, name: string = url, override: boolean = false) {
    await this.http
      .get(url, { responseType: 'text' })
      .pipe(tap(svg => this.add(name, svg, override)))
      .toPromise();
  }

  /**
   * remove a registered icon
   */
  remove(name: string) {
    if (this.icons.has(name)) {
      this.icons.delete(name);
    }
    if (this.lazyIcons.has(name)) {
      this.lazyIcons.delete(name);
    }
  }
}
