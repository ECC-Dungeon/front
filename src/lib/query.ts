import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false, // データを再フェッチしないようにする
    retry: false, // クエリが失敗しても再試行しないようにする
    staleTime: 1000 * 60 * 10, // 10分間キャッシュを保持する
  },
} satisfies DefaultOptions;

// 非同期関数の戻り値を取得する
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

// クエリの設定を取得して、一部プロパティを除外する
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  | 'queryKey'
  | 'queryFn'
  | 'enabled'
  | 'initialData'
  | 'onSuccess'
  | 'onError'
  | 'refetchInterval'
  | 'select'
  | 'retry'
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>, // 成功時のデータ型
  Error, // エラー型
  Parameters<MutationFnType>[0] // 変異関数の第1引数の型
>;
