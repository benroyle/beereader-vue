import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const feedList = localStorage.getItem('feedList') ? JSON.parse(localStorage.getItem('feedList')) : [];
const feedListSubject = new BehaviorSubject(feedList);
const feed = localStorage.getItem('feed') !== 'undefined' ? JSON.parse(localStorage.getItem('feed')) : '';
const feedSubject = new BehaviorSubject(feed);
const random = false;
const randomSubject = new BehaviorSubject(random);
const config = {
  headers: {
    'accept': 'application/json, text/plain, */*',
    'content-type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XmlHttpRequest'
  }
}

export const feedService = {
  feedList: feedListSubject.asObservable(),
  get feedListValue() { return feedListSubject.value },
  feed: feedSubject.asObservable(),
  get feedValue() { return feedSubject.value },
  random: randomSubject.asObservable(),
  get randomValue() { return randomSubject.value },
  getFeeds,
  selectFeed,
  editFeed,
  deleteFeed,
  deleteAllFeeds,
  addFeed,
  getRandomNumber,
  setRandom
};

function getRandomNumber(maxNumber) {
  let x = Math.floor((Math.random() * maxNumber) + 1);
  x = x - 1;
  /*if ((maxNumber > 2) && (x === this.state.x)) {
    getRandomNumber(maxNumber);
  } else {
    setRandomNum(x);
  }*/
  return x;
}

async function getFeeds(id, random) {
  await axios.post('http://localhost:8081/beereader-vue/getFeedsForUser/', { 'id': id }, config)
  .then((response) => (response.data))
  .then((feeds) => {
    if (feeds !== undefined) {
      if (random === true) {
        const randomFeedNum = getRandomNumber(feeds.length);
        localStorage.setItem('feed', JSON.stringify(feeds[randomFeedNum]));
        feedSubject.next(feeds[randomFeedNum]);
      } else {
        localStorage.setItem('feed', JSON.stringify(feeds[0]));
        feedSubject.next(feeds[0]);
      }
      localStorage.setItem('feedList', JSON.stringify(feeds));
      feedListSubject.next(feeds);
    } else {
      console.log("error here");
    }
  });
}

function setRandom(value) {
  randomSubject.next(value);
}

function selectFeed(feed) {
  feedSubject.next(feed);
}

async function editFeed(id, sitename, siteurl) {
  const feedEdit = await axios.post('http://localhost:8081/beereader-vue/editFeed/', { 'id': id, 'sitename': sitename, 'siteurl': siteurl }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (feedEdit !== undefined) {
    return feedEdit;
  }
}

async function deleteFeed(id) {
  const feedDelete = await axios.post('http://localhost:8081/beereader-vue/deleteFeed/', { 'id': id }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (feedDelete !== undefined) {
    return feedDelete;
  }
}

async function deleteAllFeeds(userid) {
  const feedDeleteAll = await axios.post('http://localhost:8081/beereader-vue/deleteAllFeeds/', { 'userid': userid }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (feedDeleteAll !== undefined) {
    return feedDeleteAll;
  }
}

async function addFeed(sitename, siteurl, userid) {
  const feedAdd = await axios.post('http://localhost:8081/beereader-vue/addFeed/', { 'sitename': sitename, 'siteurl': siteurl, 'userid': userid }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (feedAdd !== undefined) {
    return feedAdd;
  }
}
