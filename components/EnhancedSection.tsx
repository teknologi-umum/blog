import React, { useState } from 'react';

interface EnhancedSectionProps {
  copyable?: boolean;
  children: React.ReactNode;
}

// From https://stackoverflow.com/a/60564620
function getNodeText(node) {
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
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

  const buttonClass =
    'absolute top-0 right-0 px-2 py-1 m-2 duration-200 text-sm rounded ' +
    (clicked ? 'bg-white' : 'text-white bg-black');

  return (
    <button className={buttonClass} onClick={handleClickCopy} onBlur={handleBlur}>
      {clicked ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function EnhancedSection({ copyable, children, ...wrapperProps }: EnhancedSectionProps) {
  const Wrapper = React.isValidElement(children) ? children.props.parentName : 'div';

  return (
    <section className="relative">
      <Wrapper {...wrapperProps}>{children}</Wrapper>
      {copyable && <CopyButton text={getNodeText(children) + '\n'} />}
    </section>
  );
}
