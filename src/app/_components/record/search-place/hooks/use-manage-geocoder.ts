import { useEffect, useState } from 'react';

import useRecordInfo from '@/stores/use-record-info';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';

export default function useManageGeocoder() {
  const { setCoords } = useRecordInfo(state => state);
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

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

    // 선택한 행정구역을 바탕으로 카카오 장소 검색을 하기 위해 좌표값 설정
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

  return { geocode };
}
