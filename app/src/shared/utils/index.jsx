import React from 'react';

export const isObjectEmpty = objectName => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export const trimText = (text, maxLength, dots = '...') => {
  // Remove all HTML tags from the text
  const cleanText = text?.replace(/<[^>]*>/g, '');

  if (!cleanText?.length) return null;
  if (cleanText?.length <= maxLength) {
    return (
      <div className="description" dangerouslySetInnerHTML={{ __html: text }} />
    );
  }
  // Trim text by maxLength without cutting words
  let trimmedText = cleanText.substr(0, maxLength);
  trimmedText = trimmedText.substr(
    0,
    Math.min(trimmedText.length, trimmedText.lastIndexOf(' '))
  );

  return (
    <div className="description">
      <p dangerouslySetInnerHTML={{ __html: trimmedText + dots }} />
    </div>
  );
};

export const formatDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const dateArray = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Anchorage',
    })
    .split('/');

  const tmp = dateArray[0];
  dateArray[0] = dateArray[1];
  dateArray[1] = tmp;

  return dateArray.join('/');
};

export const abbreviateLastName = fullName => {
  // Split the full name into words
  if (fullName) {
    let words = fullName.split(' ');

    // Abbreviate the last word if there are more than one word
    if (words.length > 1) {
      // Abbreviate the last word
      let abbreviatedLastWord = words[words.length - 1][0] + '.';
      words[words.length - 1] = abbreviatedLastWord;
    }

    // Join the words back into a single string and return
    return words.join(' ');
  }
};

export const getRandomPeople = (users, count) => {
  let people = [];
  let arr = [];
  if (users?.length > count - 1) {
    while (people.length < count) {
      var r = Math.floor(Math.random() * users.length);
      if (arr.indexOf(r) === -1) people.push(users[r]) && arr.push(r);
    }
  }
  return people;
};

export const getShuffledCountries = (countries, count) => {
  let suffled;
  if (countries?.data?.length > count) {
    suffled = [...countries.data];
    suffled = suffled.sort(() => 0.5 - Math.random());
    suffled = suffled.filter(el => el?.icon?.items?.[0]?.src);
    suffled = suffled.slice(0, count);
  }
  return suffled;
};


export const darkenColor = (col, amt) => {
  // amt: 0 (no change) to 1 (black)
  let hex = col.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  let num = parseInt(hex, 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;
  r = Math.round(r * (1 - amt));
  g = Math.round(g * (1 - amt));
  b = Math.round(b * (1 - amt));
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
};


export const getWindowWidth = () => {
  return window.innerWidth;
};
