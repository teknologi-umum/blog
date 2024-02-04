import type { Author } from "~/types/post";
import { TelegramIcon, TwitterIcon } from "~/icons";

type AuthorCardProps = Partial<Author>;

export function AuthorCard(props: AuthorCardProps) {
    return (
        <div className="text-center md:text-left md:inline-grid md:grid-cols-[3.5rem,1fr] md:grid-rows-2 md:items-center md:justify-center font-sans">
            <div className="grid place-items-center row-start-1 row-end-3 pr-3">
                <a href={`https://github.com/${props.github}`} id="author-github" data-umami-event="Author GitHub Link">
                    <img
                        className="rounded-full print:border print:border-gray-200"
                        src={`https://github.com/${props.github}.png`}
                        width="42"
                        height="42"
                        alt="author"
                    />
                </a>
            </div>
            <span className="md:text-left text-gray-700 dark:text-gray-300">{props.author}</span>
            <div className="flex flex-row items-center justify-center gap-4">
                {!!props.twitter && (
                    <div className="flex-initial pr-3">
                        <a
                            href={`https://twitter.com/${props.twitter}`}
                            className="flex items-center justify-center md:justify-start gap-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-200"
                            id="author-twitter"
                            data-umami-event="Author Twitter Link"
                        >
                            <span className="text-primary-600">
                                <TwitterIcon />
                            </span>
                            @{props.twitter}
                        </a>
                    </div>
                )}
                {!!props.telegram && (
                    <div className="flex-initial">
                        <a
                            href={`https://t.me/${props.telegram}`}
                            className="flex items-center justify-center md:justify-start gap-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-200"
                            id="author-telegram"
                            data-umami-event="Author Telegram Link"
                        >
                            <span className="-mr-1 text-primary-600">
                                <TelegramIcon width="1.5rem" height="1.5rem" />
                            </span>
                            @{props.telegram}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
