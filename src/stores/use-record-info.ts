import { create } from 'zustand';

import { SelectedPlace } from '@/app/_components/record/search-place';

interface Image {
  downloadURL: string;
  fileName: string;
}

interface RecordInfoState {
  coords: { lat: number; lng: number };
  selectedPlace: SelectedPlace[];
  images: Image[];
}

interface RecordInfoAction {
  setCoords: ({ lat, lng }: { lat: number; lng: number }) => void;
  setSelectedPlace: (update: (prev: SelectedPlace[]) => SelectedPlace[]) => void;
  setImages: (images: Image[]) => void;
}

const useRecordInfo = create<RecordInfoState & RecordInfoAction>(set => ({
  coords: { lat: 0, lng: 0 },
  selectedPlace: [],
  images: [],

  setCoords: ({ lat, lng }) =>
    set(() => ({
      coords: { lat, lng },
    })),

  setSelectedPlace: update =>
    set(state => ({
      selectedPlace: update(state.selectedPlace),
    })),

  setImages: images =>
    set(() => ({
      images,
    })),
}));

export default useRecordInfo;
