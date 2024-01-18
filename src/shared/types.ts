export interface ClassNameProp {
  className?: string;
}

export interface ServerResponse {
  type: 'success' | 'error';
  message: string;
}

export interface Handlers<T = void> {
  onSuccess?(value: T): void;
  onError?(error: Error): void;
}
