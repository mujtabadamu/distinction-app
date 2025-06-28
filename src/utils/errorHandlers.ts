import { Notify } from '@flexisaf/flexibull2';
import { errorNotifier } from './helpers';
import { statusCodes } from './constants';

interface IObj {
  code: number;
  message: string;
}

export interface CustomRTKQueryError {
  status: number;
  data: { message: string };
}

export const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred.';

export const networkErrorHandler = (
  statusCode: number | undefined,
  message: string | undefined
) => {
  const { INTERNAL_SERVER_ERROR, CONFLICT, BAD_REQUEST, UNAUTHORIZED } =
    statusCodes;
  switch (statusCode) {
    case INTERNAL_SERVER_ERROR: {
      errorNotifier(
        message ||
          "An error ocurred, but don't worry the problem is from our end. Please try again later while we try to get it fixed"
      );
      break;
    }
    case BAD_REQUEST: {
      errorNotifier(
        message ||
          'Please double check your fields, something is not quite right.'
      );
      break;
    }
    case CONFLICT: {
      errorNotifier(
        message ||
          'A conflict occurred while processing your request. Please check and retry.'
      );
      break;
    }
    case UNAUTHORIZED: {
      errorNotifier(
        message ||
          'You are not authorized to view this resource, please ensure you are logged in or you have the necessary permissions.'
      );
      break;
    }
    default: {
      errorNotifier(message || 'Something went wrong, please try again later.');
      break;
    }
  }
};

export const clientErrorHandler = (message: string) =>
  errorNotifier(
    message ||
      'Something went wrong, we have notified our engineers to get this fixed.'
  );

export const handleError = (err: any, obj?: IObj | IObj[], show = true) => {
  window.process = { ...window.process };
  if (process) {
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV === 'development') {
      console.error(err);
    }
  }
  // eslint-disable-next-line prefer-const
  let { response, body, status } = err;
  if (body && !response) {
    response = {
      data: body,
      status: body.status || status,
    };
  }
  let msg;
  let statusCode: number;
  const constMessage =
    'Sorry, an error has occurred, Please try again or if issue persist, contact support.';
  const msgObj: { [key: string]: string } = {
    '404': "We can't find the resource you are looking for.",
    '400': 'Sorry, an unexpected error occurred. Please try again.',
    '600':
      'Sorry, an error occurred. Please check your internet connection and try again.',
    '500':
      'Sorry Something went wrong. We have logged this error and our engineers are working to fix it as soon as possible. If you need immediate assistance, please contact our support.',
    '401': '',
    '403':
      'Sorry, You do not have a permission to access the document or program that you requested',
    '408': 'Sorry, your request took too long to process, please try again.',
    '502':
      "Sorry, we are currently experiencing a glitch with this service. Don't worry we are already aware and service will be restored as soon as possible. If you need immediate assistance, please contact our support.",
    '503':
      "Sorry, we are currently experiencing a glitch with this service. Don't worry we are already aware and service will be restored as soon as possible. If you need immediate assistance, please contact our support.",
    '504': 'Sorry, your request took too long to process, please try again.',
  };
  if (response && response instanceof Object) {
    statusCode = response?.status;
    const { data } = response;
    msg = data || data.message || data.error || constMessage;
  } else if (err?.name === 'ApiError') {
    statusCode = err?.status;
    msg = err?.body?.message || err?.body?.error || constMessage;
  } else {
    statusCode = 600;
  }
  if (statusCode === 409) {
    msgObj[`${statusCode}`] = msg;
  }
  if (!msgObj[`${statusCode}`]) {
    msgObj[`${statusCode}`] = constMessage;
  }
  if (obj instanceof Object) {
    const objAsIObj = obj as IObj;
    msgObj[`${objAsIObj.code}`] = objAsIObj.message;
  }
  if (obj instanceof Array) {
    obj.forEach((x) => {
      msgObj[`${x.code}`] = x.message;
    });
  }
  if (statusCode === 401 && msgObj['401'] === '') {
    return;
  }
  if (show && statusCode !== 401) {
    const showMsg = msg ? msg : msgObj[statusCode];
    Notify(showMsg, { status: 'error', position: 'top-right' });
  }
  return { success: false, statusCode, message: msg };
};

export const parseAsRtkQueryError = (
  errorResult: ReturnType<typeof handleError>
): CustomRTKQueryError => {
  if (!errorResult) return createGenericRtkQueryError();
  const { statusCode, message } = errorResult;

  return {
    status: statusCode,
    data: { message: message ?? UNEXPECTED_ERROR_MESSAGE },
  };
};

const createGenericRtkQueryError = (): CustomRTKQueryError => ({
  status: 0,
  data: { message: UNEXPECTED_ERROR_MESSAGE },
});

const isRTkQueryError = (error: unknown): error is CustomRTKQueryError => {
  if (typeof error === 'object' && error !== null) {
    if ('status' in error && 'data' in error) {
      const potentialData = (error as { data: unknown }).data;
      if (typeof potentialData === 'object' && potentialData !== null) {
        if ('message' in potentialData) {
          return true;
        }
      }
    }
  }
  return false;
};

export const parseErrorMessage = (error: unknown) => {
  if (isRTkQueryError(error)) {
    return error.data?.message;
  }
  if (typeof error === 'object' && error && 'message' in error) {
    if (typeof error.message === 'string') return error.message;
  }
  return UNEXPECTED_ERROR_MESSAGE;
};
