import { useCallback, useEffect, useRef } from 'react';

import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}
interface UseIntersectionObserverProps<T> extends IntersectionObserverInit {
  onChange?: (entry: IntersectionObserverEntry) => void;
  hasNextPage?: boolean | undefined;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<T, unknown>>;
}

export function useIntersectionObserver<T>({
  threshold = 0.1,
  onChange,
  hasNextPage,
  fetchNextPage,
}: UseIntersectionObserverProps<T>) {
  const observedTargetRef = useRef<HTMLDivElement | null>(null);

  const defaultCallback = () => hasNextPage && fetchNextPage && fetchNextPage();

  const observerCallback: IntersectionObserverCallback = useCallback(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onChange ? onChange(entry) : defaultCallback();
      }
    });
  }, []);

  useEffect(() => {
    if (!observedTargetRef.current) return;

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(observedTargetRef.current as HTMLDivElement);

    return () => {
      if (observedTargetRef.current) {
        observer.unobserve(observedTargetRef.current as HTMLDivElement);
      }
    };
  }, [observerCallback, threshold, observedTargetRef]);

  return { observedTargetRef };
}
