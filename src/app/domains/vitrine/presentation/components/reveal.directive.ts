// Réplique le comportement de [data-anim] du site statique : apparition au défilement via IntersectionObserver.
import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    '[style.transition-delay.ms]': 'delay',
  },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;

  private _delay = 0;

  @Input('appReveal')
  set delay(value: number | string | '') {
    this._delay = value === '' || value == null ? 0 : Number(value);
  }
  get delay(): number {
    return this._delay;
  }

  ngOnInit(): void {
    this.el.classList.add('reveal');

    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-in');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.classList.add('is-in');
            this.observer?.unobserve(this.el);
          }
        }
      },
      { threshold: 0.06 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
