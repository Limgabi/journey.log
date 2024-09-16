import { useReducer } from 'react';

export interface Region {
  id: number;
  sido: string;
  sigg: string;
  emd: string;
}

type ManageRegionAction =
  | { type: 'SET_REGION'; key: keyof Region; payload: string }
  | { type: 'DELETE_REGION'; key: keyof Region };

export default function useManageRegion() {
  const initialState: Region = {
    id: 0,
    sido: '',
    sigg: '',
    emd: '',
  };

  const regionReducer = (state: Region, action: ManageRegionAction): Region => {
    switch (action.type) {
      case 'SET_REGION':
        return {
          ...state,
          [action.key]: action.payload,
          ...(action.key === 'sido' && { sigg: '', emd: '' }), // sido 변경 시, sigg와 emd 초기화
          ...(action.key === 'sigg' && { emd: '' }), // sigg 변경 시, emd 초기화
        };
      case 'DELETE_REGION':
        return {
          ...state,
          [action.key]: '',
          ...(action.key === 'sido' && { sigg: '', emd: '' }), // sido 삭제 시, sigg와 emd 초기화
          ...(action.key === 'sigg' && { emd: '' }), // sigg 삭제 시, emd 초기화
        };
      default:
        return state;
    }
  };

  const [regionState, regionStateDispatch] = useReducer(regionReducer, initialState);

  return { regionState, regionStateDispatch };
}
