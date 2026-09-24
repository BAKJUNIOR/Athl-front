
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  template: `
    @if (active()) {
      <div
        class="cursor-ring"
        [class.is-hover]="hovering()"
        [class.is-down]="pressed()"
        [style.transform]="'translate3d(' + ringX() + 'px,' + ringY() + 'px,0) translate(-50%,-50%)'"
      ></div>
    }
  `,
  styles: `
    :host { position: fixed; inset: 0; z-index: 9999; pointer-events: none; }
    .cursor-ring {
      position: fixed; top: 0; left: 0; border-radius: 50%; pointer-events: none;
      will-change: transform;
    }
    .cursor-ring {
      width: 36px; height: 36px; border: 1.5px solid var(--accent);
      transition: width .25s ease, height .25s ease, opacity .25s ease, border-color .25s ease, background-color .25s ease;
    }
    .cursor-ring.is-hover {
      width: 56px; height: 56px; background: rgba(249, 115, 22, 0.1);
    }
    .cursor-ring.is-down { width: 30px; height: 30px; }
  `,
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  readonly active = signal(false);
  readonly hovering = signal(false);
  readonly pressed = signal(false);

  readonly ringX = signal(0);
  readonly ringY = signal(0);

  private targetX = 0;
  private targetY = 0;
  private frame?: number;

  private readonly hoverSelector =
    'a, button, [role="button"], input, textarea, select, .btn, .icon-btn, .card, .tile, .arrow, [routerLink]';

  ngOnInit(): void {
    const hasPreciseHoverPointer = typeof window !== 'undefined'
      && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    if (!hasPreciseHoverPointer) return;

    this.active.set(true);
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.targetX = event.clientX;
    this.targetY = event.clientY;

    const target = event.target as HTMLElement | null;
    this.hovering.set(!!target?.closest(this.hoverSelector));
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.pressed.set(true);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.pressed.set(false);
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.active.set(false);
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    this.active.set(true);
  }

  private loop = (): void => {
    const ease = 0.18;
    this.ringX.update((x) => x + (this.targetX - x) * ease);
    this.ringY.update((y) => y + (this.targetY - y) * ease);
    this.frame = requestAnimationFrame(this.loop);
  };
}
