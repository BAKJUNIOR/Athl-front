// Réplique le compteur animé [data-count] du site statique : anime de 0 à `to` quand le bloc entre dans le viewport.
import { Component, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  template: `{{ display }}`,
})
export class StatCounterComponent implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;
  private frame?: number;

  @Input({ required: true }) to!: number;
  @Input() decimals = 0;
  @Input() suffix = '';

  display = '';

  ngOnInit(): void {
    this.format(0);

    if (typeof IntersectionObserver === 'undefined') {
      this.format(1);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.run();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  private run(): void {
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.format(eased);
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private format(progress: number): void {
    const value = this.to * progress;
    const text = this.decimals
      ? value.toFixed(this.decimals).replace('.', ',')
      : Math.round(value).toLocaleString('fr-FR');
    this.display = text + this.suffix;
  }
}
