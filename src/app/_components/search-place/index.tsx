'use client';

import { useState, useEffect } from 'react';

import { useGetSearchKeywordAPI, useGetDistrictAPI } from '@/app/_api/search';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';

import LabelButton from './components/LabelButton';
import RegionList from './components/RegionList';
import * as S from './index.style';

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
	const [regions, setRegions] = useState({
		adsido: { name: '', code: '' },
		adsigg: { name: '', code: '' },
		ademd: { name: '', code: '' },
		adri: { name: '', code: '' },
	});
	const [selectedPlace, setSelectedPlace] = useState<{ id: string; value: string }[]>([]);

	const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
	const [coords, setCoords] = useState({ lat: 0, lng: 0 });

	const { data } = useGetDistrictAPI(params);
	const { data: searchKeywordData } = useGetSearchKeywordAPI({
		x: coords.lng,
		y: coords.lat,
		query: searchText,
	});

	const handleClickAd = (data: { name: string; code: string }) => {
		if (!regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code) {
			setRegions(prev => ({ ...prev, adsido: data }));
		} else if (
			regions.adsido.code &&
			!regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			setRegions(prev => ({ ...prev, adsigg: data }));
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			setRegions(prev => ({ ...prev, ademd: data }));
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			regions.ademd.code &&
			!regions.adri.code
		) {
			setRegions(prev => ({ ...prev, adri: data }));
		}
	};

	const handleRemoveAd = (level: string) => {
		if (level === 'adsido') {
			setRegions({
				adsido: { name: '', code: '' },
				adsigg: { name: '', code: '' },
				ademd: { name: '', code: '' },
				adri: { name: '', code: '' },
			});
		} else if (level === 'adsigg') {
			setRegions(prev => ({
				...prev,
				adsigg: { name: '', code: '' },
				ademd: { name: '', code: '' },
				adri: { name: '', code: '' },
			}));
		} else if (level === 'ademd') {
			setRegions(prev => ({
				...prev,
				ademd: { name: '', code: '' },
				adri: { name: '', code: '' },
			}));
		} else if (level === 'adri') {
			setRegions(prev => ({ ...prev, adri: { name: '', code: '' } }));
		}
	};

	useEffect(() => {
		let dropdownData: { name: string; code: string }[] = [];

		if (!regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.ctp_kor_nm || '',
					code: e.properties.ctprvn_cd || '',
				})) || [];
		} else if (
			regions.adsido.code &&
			!regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.sig_kor_nm || '',
					code: e.properties.sig_cd || '',
				})) || [];
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.emd_kor_nm || '',
					code: e.properties.emd_cd || '',
				})) || [];
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			regions.ademd.code &&
			!regions.adri.code
		) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.li_kor_nm || '',
					code: e.properties.li_cd || '',
				})) || [];
		}

		setDropdown(dropdownData);
	}, [data, regions]);

	useEffect(() => {
		let dataParam: string = '';
		let attrFilterParam: string | undefined = undefined;

		if (!regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code) {
			dataParam = 'LT_C_ADSIDO_INFO';
		} else if (
			regions.adsido.code &&
			!regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			dataParam = 'LT_C_ADSIGG_INFO';
			attrFilterParam = `sig_cd:like:${regions.adsido.code}`;
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			!regions.ademd.code &&
			!regions.adri.code
		) {
			dataParam = 'LT_C_ADEMD_INFO';
			attrFilterParam = `emd_cd:like:${regions.adsigg.code}`;
		} else if (
			regions.adsido.code &&
			regions.adsigg.code &&
			regions.ademd.code &&
			!regions.adri.code
		) {
			dataParam = 'LT_C_ADRI_INFO';
			attrFilterParam = `li_cd:like:${regions.ademd.code}`;
		}

		setParams({ data: dataParam, attrFilter: attrFilterParam });
	}, [regions]);

	useEffect(() => {
		loadGoogleMapsScript(() => {
			setIsGoogleApiLoaded(true);
		});
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

	const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleSearch = async () => {
		await geocode(
			`${regions.adsido.name} ${regions.adsigg.name} ${regions.ademd.name} ${regions.adri.name}`,
		);
	};

	const handleSelectPlace = (option: { id: string; value: string }) => {
		setSelectedPlace(prev => {
			const isAlreadySelected = prev.some(place => place.id === option.id);
			if (isAlreadySelected) {
				return prev.filter(place => place.id !== option.id);
			} else {
				return [...prev, option];
			}
		});
	};

	const handleDeletePlace = (id: string) => {
		setSelectedPlace(prev => prev.filter(place => place.id !== id));
	};

	return (
		<S.MainWrapper>
			<h2>기록할 여행 지역을 선택하세요</h2>
			<S.InputWrapper>
				<S.LabelContainer>
					{regions.adsido.name && (
						<LabelButton
							value={regions.adsido.name}
							onClick={() => handleRemoveAd('adsido')}
							type="secondary"
						/>
					)}
					{regions.adsigg.name && (
						<LabelButton
							value={regions.adsigg.name}
							onClick={() => handleRemoveAd('adsigg')}
							type="secondary"
						/>
					)}
					{regions.ademd.name && (
						<LabelButton
							value={regions.ademd.name}
							onClick={() => handleRemoveAd('ademd')}
							type="secondary"
						/>
					)}
					{regions.adri.name && (
						<LabelButton
							value={regions.adri.name}
							onClick={() => handleRemoveAd('adri')}
							type="secondary"
						/>
					)}
				</S.LabelContainer>
			</S.InputWrapper>

			{!!regions.adsido.name && !!regions.adsido.name && (
				<S.PlaceWrapper>
					<h3>기록할 장소를 선택하세요</h3>
					<Input
						type="search"
						value={searchText}
						handleChange={handleChangeSearchText}
						handleSearch={handleSearch}
					/>
					<S.LabelContainer>
						{selectedPlace.map(place => (
							<LabelButton
								key={place.id}
								value={place.value}
								onClick={() => handleDeletePlace(place.id)}
							/>
						))}
					</S.LabelContainer>
				</S.PlaceWrapper>
			)}

			{searchKeywordData?.documents && searchKeywordData?.documents.length > 0 ? (
				<Select
					options={searchKeywordData?.documents.map(option => ({
						id: option.id,
						value: option.place_name,
					}))}
					selected={selectedPlace}
					onSelect={handleSelectPlace}
				/>
			) : (
				<RegionList data={dropdown} onSelect={handleClickAd} />
			)}
		</S.MainWrapper>
	);
}
