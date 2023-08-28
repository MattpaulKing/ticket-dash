export function clickOutside(node: HTMLElement, opts?: string) {
	const handleClick = ({target}: MouseEvent) => {
		if (opts !== undefined) {
			const ignore = document.getElementById(opts);
				if (ignore?.contains(target as Node)) return;

				if (!node.contains(target as Node) ) {
					node.dispatchEvent(new CustomEvent("outclick"));
				}
		} else {
			if (!node.contains(target as Node)) {
				node.dispatchEvent(new CustomEvent('outclick'))
			}
		}
	}

	document.addEventListener("click", handleClick, {passive: true, capture: true});

	return {
		destroy() {
			document.removeEventListener("click", handleClick);
		}
	};
}

export const toTitleCase = (str: string, delimiter: string) => {
  return str.split(delimiter).map( (word) => word[0].toUpperCase() + word.slice(1)).join(" ")
}

export function indexOfFirstUppercase(str: string) {
    for (let i=0; i<str.length; ++i) {
        if (str.charAt(i) === str.charAt(i).toUpperCase()) {
            return i
        }
    }
    return -1
}

export function sliceLong(str: string) {
  if (str.length > 17) {
    return str.slice(0,13).concat("...")
  } else {
    return str
  }
}

export const getComparisonAveragePrice = (a) => {
 return ((a.medianPrice - a.comparisonAveragePrice) / a.comparisonAveragePrice) * 100
}
