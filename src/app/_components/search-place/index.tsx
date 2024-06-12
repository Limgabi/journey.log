'use client';

import React, { useEffect, useState } from 'react';
import * as S from './index.style';
import { useGetDistrict } from '@/app/_api/search';

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

	const [adsido, setAdsodi] = useState({ name: '', code: '' });
	const [adsigg, setAdsigg] = useState({ name: '', code: '' });
	const [ademd, setAdemd] = useState({ name: '', code: '' });
	const [adri, setAdri] = useState({ name: '', code: '' });

	const { data } = useGetDistrict(params);

	const handleClickAd = (data: { name: string; code: string }) => {
		if (!!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			setAdsodi(data);
		}
		if (!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			setAdsigg(data);
		} else if (!!adsido.code && !!adsigg.code && !!!ademd.code && !!!adri.code) {
			setAdemd(data);
		} else if (!!adsido.code && !!adsigg.code && !!ademd.code && !!!adri.code) {
			setAdri(data);
		}
	};

	useEffect(() => {
		let dropdownData = [];

		if (!!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.ctp_kor_nm,
					code: e.properties.ctprvn_cd,
				})) || [];
		}
		if (!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.sig_kor_nm,
					code: e.properties.sig_cd,
				})) || [];
		} else if (!!adsido.code && !!adsigg.code && !!!ademd.code && !!!adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.emd_kor_nm,
					code: e.properties.emd_cd,
				})) || [];
		} else if (!!adsido.code && !!adsigg.code && !!ademd.code && !!!adri.code) {
			dropdownData =
				data?.map((e: DistrictDropdown) => ({
					name: e.properties.li_kor_nm,
					code: e.properties.li_cd,
				})) || [];
		}

		setDropdown(dropdownData);
	}, [data, adsido, adsigg, ademd, adri]);

	useEffect(() => {
		if (!!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			setParams({ data: 'LT_C_ADSIDO_INFO' });
		}
		if (!!adsido.code && !!!adsigg.code && !!!ademd.code && !!!adri.code) {
			setParams({ data: 'LT_C_ADSIGG_INFO', attrFilter: `sig_cd:like:${adsido.code}` });
		} else if (!!adsido.code && !!adsigg.code && !!!ademd.code && !!!adri.code) {
			setParams({ data: 'LT_C_ADEMD_INFO', attrFilter: `emd_cd:like:${adsigg.code}` });
		} else if (!!adsido.code && !!adsigg.code && !!ademd.code && !!!adri.code) {
			setParams({ data: 'LT_C_ADRI_INFO', attrFilter: `li_cd:like:${ademd.code}` });
		}
	}, [adsido, adsigg, ademd, adri]);

	return (
		<div>
			<S.InputWrapper>
				<input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
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
