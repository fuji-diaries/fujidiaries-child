(() => {
  const v = document.getElementById('heroVideo');
  if (!v) return;

  // 自動再生の条件を満たす基本セット
  v.muted = true;
  v.playsInline = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');

  const tryPlay = async () => {
    try {
      await v.play();
    } catch (e) {
      // 自動再生ブロック時は「最初のユーザー操作」で再トライ
      const once = () => {
        v.play().catch(() => {});
        window.removeEventListener('pointerdown', once);
        window.removeEventListener('touchstart', once);
        window.removeEventListener('click', once);
      };
      window.addEventListener('pointerdown', once, { once: true });
      window.addEventListener('touchstart', once, { once: true, passive: true });
      window.addEventListener('click', once, { once: true });
    }
  };

  document.addEventListener('DOMContentLoaded', tryPlay);

  // Safari系：タブ復帰で止まる対策
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tryPlay();
  });
})();
