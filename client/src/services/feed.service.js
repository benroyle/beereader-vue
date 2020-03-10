import axios from 'axios';

const API_URL = 'http://localhost:8081/beereader-vue/';

class FeedService {
  getFeedsForUser(userid) {
    return axios.post(API_URL + 'getFeedsForUser', {
      userid: userid
    })
    .then(response => {
      return response.data;
    });
  }
  async getFeedItems(feedurl) {
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
      return feedItemsArray;
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
};

export default new FeedService();

/*function getRandomNumber(maxNumber) {
  let x = Math.floor((Math.random() * maxNumber) + 1);
  x = x - 1;
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
}*/
