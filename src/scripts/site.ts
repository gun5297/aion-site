// Header state, mobile menu and gentle scroll reveals.
export function initSite() {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');

  // Header gains a hairline shadow once the page has scrolled; the page-top button appears further down.
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    root.classList.toggle('is-scrolled-far', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  // While the full-screen menu is open, the page behind it is inert and focus moves into the menu.
  const behind = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean) as HTMLElement[];
  const setOpen = (open: boolean) => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = (open ? toggle.dataset.closeLabel : toggle.dataset.openLabel) ?? '';
    root.classList.toggle('menu-open', open);
    behind.forEach((el) => el.toggleAttribute('inert', open));
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
  };
  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      setOpen(false);
      toggle?.focus();
    }
  });
  // The breakpoint lives in CSS only: once the toggle is hidden, the desktop nav is showing.
  window.addEventListener('resize', () => {
    if (toggle && root.classList.contains('menu-open') && getComputedStyle(toggle).display === 'none') setOpen(false);
  });

  // Keyboard focus inside the cross-origin map iframe never matches :focus-within,
  // so mark the frame while the iframe holds focus (the window blurs into it).
  const map = document.querySelector<HTMLElement>('[data-map]');
  if (map) {
    const frame = map.querySelector('iframe');
    window.addEventListener('blur', () => {
      setTimeout(() => map.classList.toggle('is-focused', document.activeElement === frame));
    });
    window.addEventListener('focus', () => map.classList.remove('is-focused'));
  }

  // Reveal: content is visible by default; only with JS and motion allowed does it fade in once.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window) || targets.length === 0) return;
  root.classList.add('can-reveal');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  targets.forEach((el) => io.observe(el));
}
