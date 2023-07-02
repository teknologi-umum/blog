import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type ImageWithFrameProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function ImageWithFrame(props: ImageWithFrameProps) {
    if (props.src === undefined) return null;
    return (
        <figure className="text-center">
            <img className="inline-block p-0 overflow-hidden rounded-md" src={props.src} alt={props.alt ?? ""} />
            <figcaption className="break-words">{props.alt}</figcaption>
        </figure>
    );
}
