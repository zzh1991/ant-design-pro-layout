// https://umijs.org/config/
import os from 'os';
import { IPlugin, IConfig } from 'umi-types';
import defaultSettings from './defaultSettings';
import webpackPlugin from './plugin.config';
import dartConfig from '@ant-design/dark-theme';

const { pwa, primaryColor } = defaultSettings;
const { APP_TYPE, TEST } = process.env;

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
  // ...(!process.env.TEST && os.platform() === 'darwin'
  //   ? {
  //       dll: {
  //         include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
  //         exclude: ['@babel/runtime'],
  //       },
  //       hardSource: true,
  //     }
  //   : {}),
];

export default {
  // add for transfer to umi
  plugins,
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  // 路由配置
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        // dashboard
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
          routes: [
            {
              path: '/welcome',
              name: 'one',
              icon: 'smile',
              component: './Welcome',
              routes: [
                {
                  path: '/welcome/welcome',
                  name: 'two',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
          ],
        },
        // dashboard
        {
          path: '/welcome2',
          name: 'two',
          icon: 'file-protect',
          authority: 'admin',
          component: './Welcome',
        },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
    ...dartConfig,
  },
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      localIdentName: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (context.resourcePath.includes('example') && match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
} as IConfig;
