declare module "react-image-zooom" {
  import { FC, HTMLAttributes } from "react";

  interface ReactImageZoomProps extends HTMLAttributes<HTMLDivElement> {
    src: string;
    zoom?: number;
    zoomImage?: string;
    zoomMargin?: number;
    zoomPosition?: string;
  }

  const ReactImageZooom: FC<ReactImageZoomProps>;

  export default ReactImageZooom;
}
