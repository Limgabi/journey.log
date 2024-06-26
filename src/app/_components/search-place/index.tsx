'use client';

import React, { useState, useEffect } from 'react';
import * as S from './index.style';
import { useGetSearchKeywordAPI, useGetDistrictAPI } from '@/app/_api/search';

interface DistrictDropdown {
	properties: {
		ctp_kor_nm?: string;
		sig_kor_nm?: string;
		emd_kor_nm?: string;
		li_kor_nm?: string;

		ctprvn_cd?: string;
		sig_cd?: string;
		emd_cd?: string;
		li_cd?: string;
	};
}

export default function SearchPlace() {
	const [searchText, setSearchText] = useState('');
	const [params, setParams] = useState<{ data: string; attrFilter?: string }>();
	const [dropdown, setDropdown] = useState<{ name: string; code: string }[]>([]);
	const [adsido, setAdsido] = useState({ name: '', code: '' });
	const [adsigg, setAdsigg] = useState({ name: '', code: '' });
	const [ademd, setAdemd] = useState({ name: '', code: '' });
	const [adri, setAdri] = useState({ name: '', code: '' });

	const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
	const [coords, setCoords] = useState({ lat: 0, lng: 0 });

	const { data } = useGetDistrictAPI(params);

	const handleClickAd = (data: { name: string; code: string }) => {
		if (!adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			setAdsido(data);
		} else if (adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			setAdsigg(data);
		} else if (adsido.code && adsigg.code && !ademd.code && !adri.code) {
			setAdemd(data);
		} else if (adsido.code && adsigg.code && ademd.code && !adri.code) {
			setAdri(data);
		}
	};

	useEffect(() => {
		let dropdownData: { name: string; code: string }[] = [];

		if (!adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.ctp_kor_nm || '',
					code: e.properties.ctprvn_cd || '',
				})) || [];
		} else if (adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.sig_kor_nm || '',
					code: e.properties.sig_cd || '',
				})) || [];
		} else if (adsido.code && adsigg.code && !ademd.code && !adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.emd_kor_nm || '',
					code: e.properties.emd_cd || '',
				})) || [];
		} else if (adsido.code && adsigg.code && ademd.code && !adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.li_kor_nm || '',
					code: e.properties.li_cd || '',
				})) || [];
		}

		setDropdown(dropdownData);
	}, [data, adsido, adsigg, ademd, adri]);

	useEffect(() => {
		let dataParam: string = '';
		let attrFilterParam: string | undefined = undefined;

		if (!adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			dataParam = 'LT_C_ADSIDO_INFO';
		} else if (adsido.code && !adsigg.code && !ademd.code && !adri.code) {
			dataParam = 'LT_C_ADSIGG_INFO';
			attrFilterParam = `sig_cd:like:${adsido.code}`;
		} else if (adsido.code && adsigg.code && !ademd.code && !adri.code) {
			dataParam = 'LT_C_ADEMD_INFO';
			attrFilterParam = `emd_cd:like:${adsigg.code}`;
		} else if (adsido.code && adsigg.code && ademd.code && !adri.code) {
			dataParam = 'LT_C_ADRI_INFO';
			attrFilterParam = `li_cd:like:${ademd.code}`;
		}

		setParams({ data: dataParam, attrFilter: attrFilterParam });
	}, [adsido, adsigg, ademd, adri]);

	useEffect(() => {
		const loadGoogleMapsScript = () => {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initMap`;
			script.async = true;
			script.defer = true;
			window.initMap = () => setIsGoogleApiLoaded(true);
			document.head.appendChild(script);
		};

		if (!window.google) {
			loadGoogleMapsScript();
		} else {
			setIsGoogleApiLoaded(true);
		}
	}, []);

	const geocode = (address: string) => {
		if (!isGoogleApiLoaded) {
			return;
		}

		const geocoder = new window.google.maps.Geocoder();

		geocoder.geocode({ address }, (results: any, status: string) => {
			if (status === 'OK') {
				const location = results[0].geometry.location;
				setCoords({
					lat: location.lat(),
					lng: location.lng(),
				});
			} else {
				console.error(status);
			}
		});
	};

	const handleSearch = async () => {
		await geocode(`${adsido.name} ${adsigg.name} ${ademd.name} ${adri.name}`);

		if (searchText) {
			const res = await useGetSearchKeywordAPI({
				x: coords.lng,
				y: coords.lat,
				keyword: searchText,
			});
			console.log(res);
		}
	};

	return (
		<div>
			<S.InputWrapper>
				<div>{`${adsido.name} ${adsigg.name} ${ademd.name} ${adri.name}`}</div>
				<input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
				<button onClick={handleSearch} disabled={!isGoogleApiLoaded}>
					Search
				</button>
			</S.InputWrapper>
			<ul>
				{dropdown.map((data, idx) => (
					<li key={idx} onClick={() => handleClickAd(data)}>
						{data.name}
					</li>
				))}
			</ul>
		</div>
	);
}
