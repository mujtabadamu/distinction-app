import { Notify } from '@flexisaf/flexibull2';
import isEmpty from 'lodash/isEmpty';
import {
  DEFAULT_ERROR_MESSAGE,
  Environment,
  ERROR,
  SUCCESS,
  TOP_RIGHT,
  WARNING,
} from './constants';
import axios from 'axios';
import moment from 'moment';

export const getLocalItem = (item: string) => localStorage.getItem(item);

export const setLocalItem = (item: string, value: string) =>
  localStorage.setItem(item, value);

export const clearLocalItem = (item: string) => localStorage.removeItem(item);

export const getLocalAccessToken = () => getLocalItem('ds_access_token');
export const getLocalRefreshToken = () => getLocalItem('ds_refresh_token');
export const getLocalUser = () => JSON.parse(getLocalItem('ds_user') || '{}');

export const setLocalAccessToken = (value: string) =>
  setLocalItem('ds_access_token', value);
export const setLocalRefreshToken = (value: string) =>
  setLocalItem('ds_refresh_token', value);
export const setLocalUser = (value: string) => setLocalItem('ds_user', value);

export const clearLocalAccessToken = () => clearLocalItem('ds_access_token');
export const clearLocalRefreshToken = () => clearLocalItem('ds_refresh_token');
export const clearLocalUser = () => clearLocalItem('ds_user');

export const logout = () => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
  window.location.href = '/login';
};

export const stringToHslColor = (text = '', s = 50, l = 80) => {
  const str = text.replace(/ /g, '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const calculateOffset = (page: number, pageSize: number) => {
  const offSet = (page - 1) * pageSize;
  return offSet;
};

const STORE_PREFIX = 'SAFDISTINCTION_STORE';

export const typeGenerator = (typeName: string) => ({
  request: `${STORE_PREFIX}_${typeName}`,
  success: `${STORE_PREFIX}_${typeName}_SUCCESS`,
  failure: `${STORE_PREFIX}_${typeName}_FAILED`,
});

export const convertArrayToObject = (array: [], key: string) => {
  const initialValue = {};
  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    initialValue
  );
};

export const successNotifier = (message: string) => {
  Notify(message || DEFAULT_ERROR_MESSAGE, {
    position: TOP_RIGHT,
    status: SUCCESS,
  });
};

export const errorNotifier = (message: string) => {
  Notify(message || DEFAULT_ERROR_MESSAGE, {
    position: TOP_RIGHT,
    status: ERROR,
  });
};

export const warningNotifier = (message: string) => {
  Notify(message || DEFAULT_ERROR_MESSAGE, {
    position: TOP_RIGHT,
    status: WARNING,
  });
};

export const thousandFormatter = (num: number) =>
  new Intl.NumberFormat().format(num);

export function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const getMonthString = (monthNumber: number): string => {
  const monthStrings: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthStrings[monthNumber];
};

export const getUrlParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hourText = hours === 1 ? 'hr' : 'hrs';
  return `${hours} ${hourText} ${mins} mins`;
};

// Create a new Date object
const currentDate = new Date();

function formatTimeComponent(component: { toString: () => string }) {
  return component.toString().padStart(2, '0');
}
// Get individual date components
function formatCurrentDate(date: Date) {
  const year = date.getFullYear();
  const month = formatTimeComponent(date.getMonth() + 1);
  const day = formatTimeComponent(date.getDate());
  return `${day}-${month}-${year}`;
}
function formatCurrentTime(date: Date) {
  const hours = formatTimeComponent(date.getHours());
  const minutes = formatTimeComponent(date.getMinutes());
  const seconds = formatTimeComponent(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

export const formattedDate = formatCurrentDate(currentDate);
export const formattedTime = formatCurrentTime(currentDate);

type ObjectWithKey<T = any> = { [key: string]: T };

export const findIndexInArray = (
  originalArray: ObjectWithKey[],
  objectToFind: ObjectWithKey,
  key: string,
  key2?: string
): number => {
  return originalArray.findIndex((item) => {
    if (key2) return item[key][key2] === objectToFind[key][key2];
    else return item[key] === objectToFind[key];
  });
};

export const returnUpdatedList = <T extends ObjectWithKey>(
  newObj: T,
  oldList: T[],
  key = 'id',
  key2?: string
): T[] => {
  const indexOfLocal = findIndexInArray(oldList, newObj, key, key2);
  if (indexOfLocal !== -1) {
    const updatedList = [...oldList];
    updatedList[indexOfLocal] = newObj;
    return updatedList;
  }
  return oldList;
};

export const capitalizeFirstLetter = (input: string): string => {
  return input.length > 0
    ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    : input;
};
const exceptions: string[] = ['and', 'in'];
export const capitalizeFirstLetterOFEachWord = (input: string): string => {
  return input
    .split(' ')
    .map((word) => {
      const lowerCasedWord = word.toLowerCase();
      return exceptions.includes(lowerCasedWord)
        ? lowerCasedWord
        : lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1);
    })
    .join(' ');
};

const colorsToChoose = ['#7586E0', '#FF5247', '#FFB323', '#A05E03', '#1DA1F2'];
export const generateRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorsToChoose.length);
  const randomColor = colorsToChoose[randomIndex];
  return randomColor;
};

export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const endYear = currentYear;
  const years: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(String(year));
  }
  return years;
};

export const maskEmail = (email: string | undefined) => {
  if (!email) return;

  const [localPart, domainPart] = email.split('@');
  let maskedLocalPart;
  if (localPart.length > 6) {
    maskedLocalPart = localPart.slice(0, 3) + '***' + localPart.slice(6);
  } else if (localPart.length >= 3) {
    maskedLocalPart = localPart.slice(0, 2) + '*' + localPart.slice(3);
  } else {
    maskedLocalPart = localPart.replace(/./g, '*');
  }

  return maskedLocalPart + '@' + domainPart;
};

export const detectLanguage = (code: string): string => {
  const patterns = {
    // JavaScript and TypeScript
    javascript:
      /\b(const|let|var|function|class|=>|import|export|console\.log|async|await|document\.|window\.)\b/m,
    typescript:
      /\b(interface|type|namespace|enum|implements|readonly|declare|module|keyof|Abstract|Tuple|ReadonlyArray)\b/m,

    // Python
    python:
      /\b(import|from|def|class|if __name__|for|while|lambda|print|async|await|self\.|elif|try:|except|with open)\b/m,

    // Java
    java: /\b(public|private|protected|class|interface|extends|implements|new|void|static|final|System\.out\.println|try|catch|throws|package)\b/m,

    // C++
    cpp: /\b(#include|int main|cout<<|cin>>|class|struct|namespace|virtual|template|public:|private:|protected:|std::|return 0;)\b/m,

    // C#
    csharp:
      /\b(namespace|using|class|struct|interface|public|private|protected|static|override|async|await|Console\.WriteLine|readonly|get;|set;)\b/m,

    // PHP
    php: /\b(<\?php|echo|array|function|class|public|private|protected|namespace|use|require|include|->|::|$this)\b/m,

    // Ruby
    ruby: /\b(def|class|module|end|do|if|elsif|unless|while|until|yield|puts|print|require|include|@|\bself\b)\b/m,

    // HTML
    html: /<(!DOCTYPE|html|head|body|div|span|script|style|img|a|p|h[1-6]|input|button|form)>/im,

    // CSS
    css: /(\{.*?\}|@media|@keyframes|color:|#\w{3,6}|display:|margin:|padding:|font-size:|flex|grid|animation:|z-index)/im,

    // SQL
    sql: /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|WHERE|JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|PRIMARY KEY|FOREIGN KEY|UNION)\b/im,

    // Markdown
    markdown: /^[\s]*(#{1,6}|\*\*|__|[*-]|>\s|`\w|```)/m,

    // YAML
    yaml: /^\s*([a-zA-Z0-9_-]+:|-\s+[\w]|#.*)$/m,

    // XML
    xml: /<(\?xml|!DOCTYPE|[a-zA-Z0-9_-]+)\/?>/m,

    // C
    c: /\b(#include|int main|printf|scanf|return|void|struct|typedef|enum|#define|malloc|sizeof)\b/m,

    // Rust
    rust: /\b(fn|let|mut|struct|enum|impl|trait|pub|mod|use|extern|crate|println!|#[derive])\b/m,

    // Go
    go: /\b(func|package|import|struct|interface|chan|map|go|defer|select|case|range|make|new|fmt\.Println)\b/m,

    // Swift
    swift:
      /\b(func|class|struct|enum|let|var|import|protocol|extension|if|else|switch|case|guard|async|await|print|self|@IBOutlet|@IBAction)\b/m,

    // Kotlin
    kotlin:
      /\b(fun|class|object|interface|val|var|import|package|data|sealed|inline|suspend|coroutine|println|when|companion object)\b/m,

    // Default Plaintext
    plaintext: /.*/m, // Fallback for unrecognized languages
  };

  const trimmedCode = code.trim();
  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(trimmedCode)) {
      return lang;
    }
  }
  return 'plaintext';
};

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const generateDailyFilterOptions = (startAt: string, stopAt: string) => {
  const startDate = new Date(startAt);
  const endDate = new Date(stopAt);
  const today = new Date();
  const options = [];
  options.push({
    label: `All Days`,
    value: null,
  });
  const currentDate = new Date(startDate);
  while (currentDate <= endDate && currentDate <= today) {
    const dateStr = formatDate(currentDate);
    options.push({
      label: `Day ${options.length}`,
      value: dateStr,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return options.length > 1 ? options : [options[0]];
};

export const safeJsonParse = <T>(jsonString: string): T | undefined => {
  try {
    const data: T = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error('JSON parsing error:', error);
  }
};

export const isEnvEqual = (env: Environment) => {
  return (process.env.REACT_APP_ENV ?? process.env.NODE_ENV) === env;
};

export const secondsToMMSS = (totalSeconds: string): string => {
  const seconds = parseInt(totalSeconds) || 0;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

// Format seconds to HH:MM:SS format with optional parts
export const formatSecondsToHHMMSS = (
  totalSeconds: number,
  options?: {
    showHours?: boolean;
    showSeconds?: boolean;
  }
): string => {
  if (totalSeconds < 0) {
    return '00:00:00';
  }

  const { showHours = true, showSeconds = true } = options || {};

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (!showHours && !showSeconds) {
    // Only show minutes
    return `${minutes.toString().padStart(2, '0')}`;
  } else if (!showHours) {
    // Show MM:SS
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  } else if (!showSeconds) {
    // Show HH:MM
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  } else {
    // Show HH:MM:SS (default)
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

// Utility to convert MM:SS to total seconds
export const mmssToSeconds = (mmss: string): string => {
  const [minutes, seconds] = mmss.split(':').map(Number);
  return ((minutes || 0) * 60 + (seconds || 0)).toString();
};

// Helper function to convert minutes (decimal) to MM:SS
export const formatMinutesToDisplayTime = (minutes: string): string => {
  const totalMinutes = parseFloat(minutes) || 0;
  const mins = Math.floor(totalMinutes);
  const secs = Math.round((totalMinutes - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const unquoteString = (quotedContent: string): string => {
  if (quotedContent.startsWith('"') && quotedContent.endsWith('"')) {
    return quotedContent.slice(1, -1);
  }
  return quotedContent;
};

export function formatDateTime(date: string | Date, showTime = true) {
  const formatString = showTime ? 'Do MMM, YYYY HH:mm A' : 'Do MMM, YYYY';
  return moment(date).format(formatString);
}

export function formatTimeToHour(date: string | Date): string {
  if (!date) return '';

  try {
    return moment(date).format('hA');
  } catch (error) {
    console.warn('Invalid date format provided to formatTimeToHour:', date);
    return '';
  }
}
export function formatDateToTime(date: string | Date, showTime = true) {
  const formatString = showTime ? 'HH:mm A' : 'HH:mm';
  return moment(date).format(formatString);
}

export function formatSecondsToHumanReadableString(
  totalSeconds: number
): string {
  if (totalSeconds < 0) {
    return 'N/A';
  }

  const totalMinutes = Math.round(totalSeconds / 60);

  if (totalMinutes === 0) {
    return '0 mins';
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
  }

  if (minutes > 0 || (hours === 0 && minutes === 0)) {
    parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  }

  if (hours > 0 && minutes === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  return parts.join(' ');
}

export const getEnvLogger = (env?: Environment | Environment[]) => {
  const targetEnv = env ?? Environment.Development;
  const envs = Array.isArray(targetEnv) ? targetEnv : [targetEnv];
  const enableLogging = envs.some((env) => isEnvEqual(env));

  return {
    log: (...messages: any[]) => {
      if (enableLogging) {
        console.log(...messages);
      }
    },
    warn: (...messages: any[]) => {
      if (enableLogging) {
        console.warn(...messages);
      }
    },
    error: (...messages: any[]) => {
      if (enableLogging) {
        console.error(...messages);
      }
    },
  };
};

export const hasMinItems = (collection: unknown, min = 1) =>
  Array.isArray(collection) && collection.length >= min;

export const isEmptyOrAllStringsEmpty = (obj: Record<string, unknown>) => {
  if (isEmpty(obj)) {
    return true;
  }
  return Object.values(obj).every((value) => {
    return typeof value === 'string' && value.trim().length === 0;
  });
};

function numberToWords(num: number) {
  if (num === 0) return '---';

  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];
  const teens = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    'Ten',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  const words = [];
  let scaleIndex = 0;

  // Handle negative numbers
  let isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }

  while (num > 0) {
    let chunk = num % 1000;
    num = Math.floor(num / 1000);

    if (chunk !== 0) {
      const chunkWords = [];

      // Hundreds place
      if (chunk >= 100) {
        chunkWords.push(`${units[Math.floor(chunk / 100)]} Hundred`);
        chunk %= 100;
      }

      // Tens and units place
      if (chunk >= 20) {
        chunkWords.push(tens[Math.floor(chunk / 10)]);
        chunk %= 10;
        if (chunk > 0) {
          chunkWords.push(units[chunk]);
        }
      } else if (chunk >= 10) {
        chunkWords.push(teens[chunk - 10]);
      } else if (chunk > 0) {
        chunkWords.push(units[chunk]);
      }

      if (scaleIndex > 0) {
        chunkWords.push(scales[scaleIndex]);
      }

      words.unshift(chunkWords.join(' '));
    }

    scaleIndex++;
  }

  let result = words.join(' ');
  if (isNegative) {
    result = `Minus ${result}`;
  }

  return result;
}

export function amountToWords(amount: number) {
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  // Handle decimal amounts (for currency)
  const wholeNumber = Math.floor(amount);
  const decimal = Math.round((amount - wholeNumber) * 100);

  let words = numberToWords(wholeNumber);

  if (decimal > 0) {
    words += ` and ${numberToWords(decimal)} Cents`;
  }

  return words;
}
