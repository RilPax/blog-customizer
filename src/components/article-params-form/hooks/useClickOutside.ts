import { useEffect } from 'react';

export const useClickOutside = (
	ref: React.RefObject<HTMLElement>,
	handler: (event: MouseEvent) => void,
	active = true
) => {
	useEffect(() => {
		if (!active) return;

		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler(event);
			}
		};

		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [ref, handler, active]);
};
