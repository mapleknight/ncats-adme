import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[admeStructureImage]'
})
export class StructureImageDirective implements AfterViewInit {
  private privateEntityId: string;
  private privateSize?: number;
  private privateStereo = false;
  private imageElement: HTMLImageElement;
  private isAfterViewInit = false;
  private privateAtomMaps?: Array<number>;
  private privateVersion?: number;

  constructor(
    private el: ElementRef,
    private http: HttpClient
  ) {
    this.imageElement = this.el.nativeElement as HTMLImageElement;
  }

  ngAfterViewInit() {
    this.isAfterViewInit = true;
    this.setImageSrc();
  }

  @Input()
  set version(version: number) {
    if (version !== this.privateVersion) {
      this.privateVersion = version;
      this.setImageSrc();
    }
  }

  @Input()
  set entityId(entityId: string) {
    if (entityId !== this.privateEntityId) {
      this.privateEntityId = entityId;
      this.setImageSrc();
    }
  }

  @Input()
  set size(size: number) {
    if (size !== this.privateSize) {
      this.privateSize = size;
      this.setImageSrc();
    }
  }

  @Input()
  set stereo(showStereo: boolean) {
    if (showStereo !== this.privateStereo) {
      this.privateStereo = showStereo;
      this.setImageSrc();
    }
  }

  @Input()
  set atomMaps(atomMaps: Array<number>) {
    if (atomMaps !== this.privateAtomMaps) {
      this.privateAtomMaps = atomMaps;
      this.setImageSrc();
    }
  }

  private setImageSrc(): void {
    if (this.isAfterViewInit) {
      const srcUrl = `${environment.apiBaseUrl}api/v1/structure_image/${encodeURIComponent(this.privateEntityId)}`;
      this.imageElement.src = srcUrl;
      this.imageElement.alt = 'structure image';
    }
  }

}
