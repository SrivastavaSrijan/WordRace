export interface WordStackState {
  isLoading: boolean;
  hasError: boolean | string | undefined;
  wordStackPayload: { text: string; hash: any }[];
  charIndex: number;
  currentWord: string;
  wordIndex: number;
}

export interface WordResponse {
  [key: string]: string;
}
