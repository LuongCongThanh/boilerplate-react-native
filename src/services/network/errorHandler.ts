import {isAxiosError} from 'axios'

import {IErrorBody} from 'src/model/common'

export function normalizeError(error: unknown): IErrorBody {
  if (isAxiosError(error)) {
    const data = error.response?.data
    const message =
      data?.message ?? data?.error ?? error.message ?? 'Unknown error'
    return {title: 'Error', message}
  }
  if (error instanceof Error) {
    return {title: 'Error', message: error.message}
  }
  return {title: 'Error', message: 'Unknown error'}
}
