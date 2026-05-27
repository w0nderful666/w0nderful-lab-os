type LayoutState = "idle" | "focused" | "expanded";

type SwapOptions = {
  layout: HTMLElement | null;
  surface: HTMLElement | null;
  update: () => void;
  opening?: boolean;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const minMasterPaneHeight = 220;
const activeSwaps = new WeakMap<HTMLElement, number>();
let swapSequence = 0;

const motionDisabled = () =>
  prefersReducedMotion() ||
  document.documentElement.dataset.experience === "performance" ||
  document.documentElement.dataset.osEffects === "off";

const parseCssNumber = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const readDurationMs = (element: HTMLElement | null) => {
  const style = getComputedStyle(element || document.documentElement);
  const contentDuration = style.getPropertyValue("--os-motion-content-duration").trim();
  const detailDuration = style.getPropertyValue("--detail-duration").trim();
  const value = contentDuration.startsWith("var(") ? detailDuration : contentDuration || detailDuration;

  if (value.endsWith("ms")) return parseCssNumber(value);
  if (value.endsWith("s")) return parseCssNumber(value) * 1000;
  return 220;
};

const getViewportDetailCap = () => {
  const rootStyle = getComputedStyle(document.documentElement);
  const systemBarOffset = parseCssNumber(rootStyle.getPropertyValue("--system-bar-offset")) || 88;
  return Math.max(minMasterPaneHeight, window.innerHeight - systemBarOffset - 28);
};

const syncMasterHeight = (layout: HTMLElement | null, surface: HTMLElement | null) => {
  if (!layout) return;

  if (layout.dataset.layout === "idle") {
    layout.style.removeProperty("--os-master-pane-max-height");
    return;
  }

  if (!surface) return;
  const detailPane = surface.closest(".os-detail-pane, .detail-panel");
  const detailPaneHeight = detailPane instanceof HTMLElement ? detailPane.getBoundingClientRect().height : 0;
  const surfaceHeight = Math.max(surface.scrollHeight, surface.getBoundingClientRect().height);
  const targetHeight = Math.min(getViewportDetailCap(), Math.max(minMasterPaneHeight, detailPaneHeight, surfaceHeight));
  layout.style.setProperty("--os-master-pane-max-height", `${Math.round(targetHeight)}px`);
};

const scheduleMasterHeightSync = (layout: HTMLElement | null, surface: HTMLElement | null) => {
  if (!layout) return;
  window.requestAnimationFrame(() => {
    const fallbackSurface = layout.querySelector(".os-detail-surface");
    syncMasterHeight(layout, surface || (fallbackSurface instanceof HTMLElement ? fallbackSurface : null));
  });
};

const setLayout = (layout: HTMLElement | null, value: LayoutState) => {
  if (!layout) return;
  const open = value !== "idle";
  layout.dataset.layout = value;
  layout.dataset.detailOpen = String(open);
  if (!open) layout.style.removeProperty("--os-master-pane-max-height");
};

const syncShellLayout = (layout: HTMLElement | null, value: LayoutState) => {
  setLayout(layout, value);
  scheduleMasterHeightSync(layout, null);
  window.labOS?.setState({ layoutState: value });
};

const runDetailSwap = ({ layout, surface, update, opening = false }: SwapOptions) => {
  if (!surface || opening || motionDisabled()) {
    update();
    scheduleMasterHeightSync(layout, surface);
    if (surface) delete surface.dataset.contentSwitch;
    return;
  }

  const duration = readDurationMs(surface);
  const swapDelay = Math.max(1, Math.round(duration * 0.38));
  const swapId = swapSequence + 1;
  swapSequence = swapId;
  activeSwaps.set(surface, swapId);

  surface.dataset.contentSwitch = "out";

  window.setTimeout(() => {
    if (activeSwaps.get(surface) !== swapId) return;
    update();
    scheduleMasterHeightSync(layout, surface);
    surface.dataset.contentSwitch = "in";

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (activeSwaps.get(surface) !== swapId) return;
        if (surface.dataset.contentSwitch === "in") delete surface.dataset.contentSwitch;
        activeSwaps.delete(surface);
      });
    });
  }, swapDelay);

  if (layout) delete layout.dataset.detailSwapping;
  if (surface) delete surface.dataset.switching;
};

const alignDetail = (detail: HTMLElement | null) => {
  if (!detail) return;
  window.requestAnimationFrame(() => {
    const behavior = motionDisabled() ? "instant" : "smooth";
    detail.scrollIntoView({ behavior, block: "nearest" });
  });
};

const syncAllMasterHeights = () => {
  document.querySelectorAll(".os-master-detail").forEach((layout) => {
    if (!(layout instanceof HTMLElement)) return;
    const surface = layout.querySelector(".os-detail-surface");
    scheduleMasterHeightSync(layout, surface instanceof HTMLElement ? surface : null);
  });
};

let resizeTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedSyncHeights = () => {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(syncAllMasterHeights, 100);
};

window.addEventListener("resize", debouncedSyncHeights);
document.addEventListener("astro:page-load", syncAllMasterHeights);

window.labOSMasterDetail = {
  setLayout,
  syncShellLayout,
  runDetailSwap,
  alignDetail,
  syncMasterHeight,
  motionDisabled
};

export {};
