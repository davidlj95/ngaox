import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import { CONTENT_PATH, NGAOX_DATA_VAR } from '../../models/constants';
import { IClientSideData, IOptionsObjectStrict } from '../../models/builder';
import CopyWebpackPlugin = require('copy-webpack-plugin');
import { getContentOutputPath } from './filesystem';

export function defineDataPlugin(options: IOptionsObjectStrict, data: unknown) {
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          [NGAOX_DATA_VAR]: JSON.stringify(data)
        })
      );
      webpackConfig.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: getContentOutputPath(options),
              to: CONTENT_PATH
            }
          ]
        })
      );
      return webpackConfig;
    }
  };
}

export function mergeDefinedDataObjects(data: (null | IClientSideData)[]) {
  const dataToBeDefined = data.reduce((acc, curr) => {
    if (curr === null) return acc;
    return {
      ...acc,
      [curr.type]: curr.data
    };
  }, {});
  return dataToBeDefined as {
    [key: string]: IClientSideData;
  };
}
