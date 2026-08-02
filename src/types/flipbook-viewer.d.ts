declare module 'flipbook-viewer' {
  export interface PageData {
    img: HTMLImageElement;
    num: number;
    width: number;
    height: number;
  }

  export interface BookViewer {
    flip_forward: () => void;
    flip_back: () => void;
    zoom: () => void;
    on: (event: 'seen', handler: (pageNum: number) => void) => void;
    page_count: number;
  }

  interface BookProvider {
    numPages: () => number;
    getPage: (n: number, cb: (err: unknown, page?: PageData) => void) => void;
  }

  interface FlipbookOptions {
    backgroundColor?: string;
    boxColor?: string;
    width?: number;
    height?: number;
    singlepage?: boolean;
  }

  export function init(
    book: BookProvider,
    containerId: string,
    opts: FlipbookOptions,
    callback: (err: unknown, viewer: BookViewer) => void
  ): void;
}
