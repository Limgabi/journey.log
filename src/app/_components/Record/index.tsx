'use client';

import { ADMINISTRATIVE_DISTRICT } from '@/constants/administrative-district';
import React, { useState } from 'react';
import RegionList from './components/RegionList';
import * as S from './index.style';
import LabelButton from './components/LabelButton';

export default function Record() {
	const [searchText, setSearchText] = useState('');

	const [selected, setSelected] = useState({
		region: '',
		district: '',
	});

	return (
		<div>
			<S.InputWrapper>
				{selected.region && (
					<LabelButton
						value={selected.region}
						onClick={() => setSelected({ region: '', district: '' })}
					/>
				)}
				{selected.district && (
					<LabelButton
						value={selected.district}
						onClick={() => setSelected(prev => ({ ...prev, district: '' }))}
					/>
				)}
				<input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
			</S.InputWrapper>

			{!selected.region && searchText !== '' && (
				<RegionList
					type={'region'}
					data={Object.keys(ADMINISTRATIVE_DISTRICT).filter(region => region.includes(searchText))}
					onSelect={setSelected}
					selected={selected}
				/>
			)}
			<br />
			{selected.region && searchText !== '' && !selected.district && (
				<RegionList
					type="district"
					data={ADMINISTRATIVE_DISTRICT[selected.region]?.filter(district =>
						district.includes(district),
					)}
					onSelect={setSelected}
					selected={selected}
				/>
			)}
		</div>
	);
}
