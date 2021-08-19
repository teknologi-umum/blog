import { useRouter } from 'next/router';
import Content from './Content';

export default function PageContent(props) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h2>Loading content...</h2>;
  }

  return <Content {...props} />;
}
