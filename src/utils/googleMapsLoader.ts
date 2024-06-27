export const loadGoogleMapsScript = (callback: () => void) => {
	if (typeof window === 'undefined') {
		return;
	}

	if (window.google && window.google.maps) {
		callback();
		return;
	}

	const existingScript = document.getElementById('googleMapsScript');
	if (existingScript) {
		existingScript.onload = callback;
		return;
	}

	const script = document.createElement('script');
	script.id = 'googleMapsScript';
	script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initMap`;
	script.async = true;
	script.defer = true;
	script.onload = callback;
	document.head.appendChild(script);

	window.initMap = () => {
		callback();
	};
};
