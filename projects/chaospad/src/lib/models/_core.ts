export type ShortName =
  | 'user'
  | 'topic'
  | 'file'
  | 'contact-info'
  | 'post'
  | 'career'
  | 'project';

export type entityEntryPoint = `/api/${ShortName}s`;
export type IRI = `${entityEntryPoint}/${string}`;

export interface collection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
  'hydra:view'?: {
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next'?: string;
    'hydra:previous'?: string;
  };
}

export type JsonLd<T> = T & {
  '@id': IRI;
  '@context'?: string;
  '@type'?: string;
};
