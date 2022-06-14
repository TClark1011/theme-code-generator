import getPrintableError from '$/utils/getPrintableError';

type AsyncStoreData<T> = {
  data: T | undefined;
  errorMessage: string | undefined;
};

export const blankAsyncStoreData: AsyncStoreData<any> = {
  data: undefined,
  errorMessage: undefined,
};

export const deriveIfAsyncStoreDataIsLoading = <T>({
  data,
  errorMessage,
}: AsyncStoreData<T>): boolean => !data && !errorMessage;

export const composeAsyncDataStoreResult = <T>(data: T): AsyncStoreData<T> => ({
  errorMessage: undefined,
  data,
});

export const injectErrorMessageIntoAsyncDataStoreResult = <T>(
  store: AsyncStoreData<T>,
  errorObject: any
): AsyncStoreData<T> => ({
  ...store,
  errorMessage: getPrintableError(errorObject),
});

export default AsyncStoreData;
