import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ResponseError = AxiosError<{
	code: number;
}>;

export type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
	UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
	'queryKey'
>;

export type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
	UseMutationOptions<TData, ResponseError, TVariables, unknown>,
	'mutationFn'
>;
