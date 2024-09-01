import useRecordInfo from '@/stores/use-record-info';

export interface SelectedPlace {
  id: string;
  value: string;
}

export default function useSelectPlace() {
  const { setSelectedPlace } = useRecordInfo(state => state);

  const handleSelectPlace = (option: SelectedPlace) => {
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

  return { handleSelectPlace, handleDeletePlace };
}
