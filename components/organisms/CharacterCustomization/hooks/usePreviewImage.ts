import { useEffect, useMemo } from 'react';

import { loadImg, previewImg } from '../helper';

export const usePreviewImage = (selected: any, watch: any, isMobile = false) => {
  const previewImgUrl = useMemo(() => previewImg(selected, watch, isMobile), [selected, watch, isMobile]);

  useEffect(() => {
    loadImg(previewImgUrl);
  }, [previewImgUrl]);

  return previewImgUrl;
};
