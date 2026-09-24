import { computePosition, flip, offset, shift, autoUpdate, type Placement } from "@floating-ui/dom";

export interface PopoverAnchor {
  reference: HTMLElement;
  floating: HTMLElement;
  placement?: Placement;
  offsetPx?: number;
}

export function attachPopover(a: PopoverAnchor): () => void {
  return autoUpdate(a.reference, a.floating, async () => {
    const { x, y } = await computePosition(a.reference, a.floating, {
      placement: a.placement ?? "bottom-end",
      middleware: [offset(a.offsetPx ?? 8), flip(), shift({ padding: 8 })],
    });
    Object.assign(a.floating.style, { left: `${x}px`, top: `${y}px`, position: "absolute" });
  });
}
