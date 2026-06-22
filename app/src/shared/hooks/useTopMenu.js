import { getData } from 'shared/api';

export const useTopMenu = () => {
  const { data: topMenu } = getData('fetch/menu/main-top');

  return {
    top_menu: topMenu?.data?.links,
    isExist: !!topMenu?.data?.links && topMenu?.data?.links.length > 0,
  };
};
