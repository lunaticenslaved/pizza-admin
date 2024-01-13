export interface ClassNameProp {
  className?: string;
}

export interface ServerResponse {
  type: 'success' | 'error';
  message: string;
}
