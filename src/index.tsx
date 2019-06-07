import BasicLayout, { BasicLayoutProps } from './BasicLayout';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import SettingDrawer, {
  SettingDrawerProps,
  SettingDrawerState,
} from './SettingDrawer';

import DefaultFooter from './Footer';
import GridContent from './GridContent';
import PageHeaderWrapper from './PageHeaderWrapper';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';

import GlobalFooter, { GlobalFooterProps } from './GlobalFooter';

export { Settings } from './defaultSettings';

export { MenuDataItem } from './typings';

export {
  BasicLayout,
  BasicLayoutProps,
  HeaderProps,
  RouteContext,
  GridContent,
  DefaultHeader,
  DefaultFooter,
  GlobalFooter,
  GlobalFooterProps,
  SettingDrawer,
  SettingDrawerState,
  SettingDrawerProps,
  getPageTitle,
  getMenuData,
  PageHeaderWrapper,
};

export default BasicLayout;
