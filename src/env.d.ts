/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type LabOSMasterDetailLayoutState = "idle" | "focused" | "expanded";

interface Window {
  labOSMasterDetail?: {
    setLayout: (layout: HTMLElement | null, value: LabOSMasterDetailLayoutState) => void;
    syncShellLayout: (layout: HTMLElement | null, value: LabOSMasterDetailLayoutState) => void;
    runDetailSwap: (options: {
      layout: HTMLElement | null;
      surface: HTMLElement | null;
      update: () => void;
      opening?: boolean;
    }) => void;
    alignDetail: (detail: HTMLElement | null) => void;
    syncMasterHeight: (layout: HTMLElement | null, surface: HTMLElement | null) => void;
    motionDisabled: () => boolean;
  };
}
