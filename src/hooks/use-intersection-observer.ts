import { useCallback, useEffect, useRef } from 'react';

import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverProps<T> extends IntersectionObserverInit {
  onChange?: (entry: IntersectionObserverEntry) => void;
  hasNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<T, unknown>>;
}

export function useIntersectionObserver<T>({
  threshold = 0.1,
  onChange,
  hasNextPage,
  fetchNextPage,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps<T>) {
  const observedTargetRef = useRef<HTMLDivElement | null>(null);

  const defaultCallback = useCallback(() => {
    if (hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onChange ? onChange(entry) : defaultCallback();
        }
      });
    },
    [onChange, defaultCallback],
  );

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const options: IntersectionObserverInit = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(observerCallback, options);

    const targetElement = observedTargetRef.current;

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [observerCallback, root, rootMargin, threshold, observedTargetRef]);

  return { observedTargetRef };
}
