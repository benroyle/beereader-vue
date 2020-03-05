import FeedService from '../services/feed.service';

const initialState = {
  currentFeeds: {},
  currentFeed: {}
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
    addFeed({ commit }, userid) {
      return FeedService.addFeed(userid).then(
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
    addFeedSuccess(state) {
      state.currentFeeds = feeds;
    },
    addFeedFailure(state) {
      state.currentFeeds = null;
    }
  }
};

export default feeds;