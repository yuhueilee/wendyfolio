import type { ComponentPropsWithoutRef } from "react";

import type { PictureSource } from "../../types";

type PictureProps = Omit<
    ComponentPropsWithoutRef<"img">,
    "alt" | "src"
> & {
    alt: string;
    src: PictureSource;
};

const Picture = ({ alt, src, ...imageProps }: PictureProps) => (
    <picture className="contents">
        <source srcSet={src.avif} type="image/avif" />
        <source srcSet={src.webp} type="image/webp" />
        <img {...imageProps} src={src.jpg} alt={alt} />
    </picture>
);

export default Picture;
