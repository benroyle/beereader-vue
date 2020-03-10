import FeedService from '../services/feed.service';

const initialState = {
  currentFeeds: [],
  currentFeed: {},
  currentFeedItems: []
};

const feeds = {
  namespaced: true,
  state: initialState,
  actions: {
    getFeedsForUser({ commit }, userid) {
      return FeedService.getFeedsForUser(userid).then(
        feeds => {
          commit('getFeedsSuccess', feeds);
          return Promise.resolve(feeds);
        },
        error => {
          commit('getFeedsFailure');
          return Promise.reject(error);
        }
      );
    },
    setCurrentFeed({ commit }, feedid) {
      commit('setCurrentFeed', feedid);
      return Promise.resolve(feedid);
    },
    getFeedItems({ commit }, feedurl) {
      return FeedService.getFeedItems(feedurl).then(
        items => {
          commit('getFeedItemsSuccess', items);
          return Promise.resolve(items);
        },
        error => {
          commit('getFeedItemsFailure');
          return Promise.reject(error);
        }
      );
    },
    addFeed({ commit }, feed) {
      return FeedService.addFeed(feed).then(
        feeds => {
          commit('addFeedSuccess', feeds);
          return Promise.resolve(feeds);
        },
        error => {
          commit('addFeedFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getFeedsSuccess(state, feeds) {
      state.currentFeeds = feeds;
      state.currentFeed = feeds[0];
    },
    getFeedsFailure(state) {
      state.currentFeeds = null;
    },
    setCurrentFeed(state, feedid) {
      for (let i = 0; i < state.currentFeeds.length; i++) {
        if (state.currentFeeds[i].id === feedid) {
          state.currentFeed = state.currentFeeds[i];
        }
      }
    },
    getFeedItemsSuccess(state, items) {
      state.currentFeedItems = items;
    },
    getFeedItemsFailure(state) {
      state.currentFeedItems = null;
    },
    addFeedSuccess(state, feeds) {
      state.currentFeeds = feeds;
    },
    addFeedFailure(state) {
      state.currentFeeds = null;
    }
  }
};

export default feeds;