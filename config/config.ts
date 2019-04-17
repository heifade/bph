import { pageRoutes } from './router';

// https://umijs.org/config/

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
        immer: true,
      },
      locale: {
        enable: false, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
    },
  ],
];

export default {
  // add for transfer to umi
  plugins,
  treeShaking: true,
  routes: pageRoutes,
  hash: true,
  theme: {
    'disabled-color': '#333',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context: any, localIdentName: any, localName: any) => {
      return localName;
      // if (
      //   context.resourcePath.includes('node_modules') ||
      //   context.resourcePath.includes('ant.design.pro.less') ||
      //   context.resourcePath.includes('global.less')
      // ) {
      //   return localName;
      // }
      // const match = context.resourcePath.match(/src(.*)/);
      // if (match && match[1]) {
      //   const antdProPath = match[1].replace('.less', '');
      //   const arr = slash(antdProPath)
      //     .split('/')
      //     .map(a => a.replace(/([A-Z])/g, '-$1'))
      //     .map(a => a.toLowerCase());
      //   return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      // }
      // return localName;
    },
  },
};
