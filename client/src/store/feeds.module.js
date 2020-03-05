import FeedService from '../services/feed.service';

const feeds = {
  namespaced: true,
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
      state.feedList = feeds;
    },
    getFeedsFailure(state) {
      state.feedList = null;
    },
    addFeedSuccess(state) {
      state.feedList = feeds;
    },
    addFeedFailure(state) {
      state.feedList = null;
    }
  }
};

export default feeds;