import clsx from 'clsx';
import { useState, type ReactNode, type ReactElement, type PropsWithChildren } from 'react';

// From https://stackoverflow.com/a/60564620
function getNodeText(node: ReactNode | number | string) {
  const nodeType = typeof node;

  if (nodeType === 'string' || nodeType === 'number') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (nodeType === 'object' && node !== undefined) {
    return getNodeText((node as ReactElement).props.children);
  }
}

function CopyButton({ text = '' }) {
  const [clicked, setClicked] = useState(false);

  const handleBlur = () => {
    setClicked(false);
  };

  const handleClickCopy = () => {
    setClicked(true);
    navigator.clipboard.writeText(getNodeText(text));
    setTimeout(handleBlur, 2000); // return to original state
  };

  return (
    <button
      className={clsx(
        'absolute top-0 right-0 px-2 py-1 m-2 duration-200 text-sm rounded',
        clicked ? 'text-black bg-white' : 'text-white bg-black',
      )}
      onClick={handleClickCopy}
      onBlur={handleBlur}
    >
      {clicked ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function CopyableCodeBlocks({ children }: PropsWithChildren<{}>) {
  return (
    <section className="relative">
      <pre>{children}</pre>
      <CopyButton text={getNodeText(children) + '\n'} />
    </section>
  );
}
