import axios from 'axios'

const API_URL = 'http://localhost:8081/beereader-vue/';

class FeedService {
  getFeeds(userid) {
    return axios.post(API_URL + 'getFeeds', {
      userid: userid
    })
    .then(response => {
      return response.data;
    });
  }
  getFeedItems(feedurl) {
    return axios.post(API_URL + 'getFeedItems', {
      feedurl: feedurl
    })
    .then((response) => {
      response = response.data;
      let feedItemsArray = [];
      if (response.rss) {
        if (Array.isArray(response.rss.channel.item)) {
          feedItemsArray = response.rss.channel.item;
        }
      }
      if (response.feed) {
        if (Array.isArray(response.feed.entry)) {
          feedItemsArray = response.feed.entry;
        }
      }
      if (response.html) {
        let error = {};
        error.message = "The URL has returned HTML, not a valid feed."
        return error;
      }
      if (feedItemsArray.length > 10) {
        const excess = (feedItemsArray.length - 10);
        feedItemsArray.splice(10, excess);
      }
      let newItemsArray = feedItemsArray.map((item, index) => ({...item, id: index}));
      return newItemsArray;
    });
  }
  addFeed(feed) {
    return axios.post(API_URL + 'addFeed', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
  deleteAllFeeds(userid) {
    return axios.post(API_URL + 'deleteAllFeeds', {
      userid: userid
    })
    .then(response => {
      return response.data;
    });
  }
  editFeed(feed) {
    return axios.post(API_URL + 'editFeed', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      id: feed.id,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
  deleteFeed(feed) {
    return axios.post(API_URL + 'deleteFeed', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      id: feed.id,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
};

export default new FeedService();

/*function getRandomNumber(maxNumber) {
  let x = Math.floor((Math.random() * maxNumber) + 1);
  x = x - 1;
  return x;
}

async function getFeeds(id, random) {
  await axios.post('http://localhost:8081/beereader-vue/getFeeds/', { 'id': id }, config)
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
}*/
