"use client";

import { type RefObject, useEffect } from "react";

export function useClickOutside(
	ref: RefObject<HTMLElement>,
	callback: () => void,
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				const isInDialog =
					rect.top <= event.clientY &&
					event.clientY <= rect.top + rect.height &&
					rect.left <= event.clientX &&
					event.clientX <= rect.left + rect.width;
				if (!isInDialog) {
					callback();
				}
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [ref, callback]);
}
