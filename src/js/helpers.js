import { TIMEOUT_SEC, DAYS_ARRAY, keys } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Use timeout function to throw error for a long load
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (Error ${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const SPOON_AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': (await keys).SPOON_API_KEY,
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Use timeout function to throw error for a long load
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (Error ${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const GET_DAYS_FROM_TODAY = function (date) {
  const curDay = new Date();
  return curDay.getDay() - date.getDay();
};

export const GET_DATE_DETAILS = function (daysFromToday = 0) {
  const today = new Date();

  const formatter = new Intl.DateTimeFormat('en-UK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  let date;
  if (daysFromToday !== 0) {
    date = new Date(today);
    date.setDate(date.getDate() + daysFromToday);
  }

  if (daysFromToday === 0) {
    date = today;
  }

  return {
    unformattedDate: date,
    dateStr: formatter.format(date),
    dayOfWeek: DAYS_ARRAY[date.getDay()],
  };
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Use timeout function to throw error for a long load
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (Error ${res.status})`);
    return data;
  } catch (err) {
    throw err; // This will pass the error to the parent async function
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Use timeout function to throw error for a long load
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (Error ${res.status})`);
    return data;
  } catch (err) {
    throw err; // This will pass the error to the parent async function
  }
};*/
