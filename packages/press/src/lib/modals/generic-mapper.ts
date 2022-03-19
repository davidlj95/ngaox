export interface IMetaData {
  [key: string]: any;
}

export interface ITocLink {
  title: string;
  id: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type IGenericContentMap = Array<{
  path: string;
  data: IMetaData;
}>;

export interface IParsedContent {
  data: IMetaData;
  content: string;
  toc: ITocLink[];
}
