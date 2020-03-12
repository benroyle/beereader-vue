import FeedService from '../services/feed.service'

const initialState = () => {
  return {
    currentFeeds: [],
    activeFeed: {},
    currentFeedItems: []
  }
};

const feeds = {
  namespaced: true,
  state: initialState(),
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
    logout({ commit }) {
      commit('resetState')
    },
    setActiveFeed({ commit }, feedid) {
      commit('setActiveFeed', feedid);
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
    },
    deleteAllFeeds({ commit }, userid) {
      return FeedService.deleteAllFeeds(userid).then(
        feeds => {
          commit('deleteAllFeedsSuccess', feeds);
          return Promise.resolve(feeds);
        },
        error => {
          commit('deleteAllFeedsFailure');
          return Promise.reject(error);
        }
      );
    },
    editFeed({ commit }, feed) {
      return FeedService.editFeed(feed).then(
        feeds => {
          commit('editFeedSuccess', feeds);
          return Promise.resolve(feeds);
        },
        error => {
          commit('editFeedFailure');
          return Promise.reject(error);
        }
      );
    },
    deleteFeed({ commit }, feed) {
      return FeedService.deleteFeed(feed).then(
        feeds => {
          commit('deleteFeedSuccess', feeds);
          return Promise.resolve(feeds);
        },
        error => {
          commit('deleteFeedFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getFeedsSuccess(state, feeds) {
      state.currentFeeds = feeds;
      state.activeFeed = feeds[0];
    },
    resetState(state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, initialState())
    },
    getFeedsFailure(state) {
      state.currentFeeds = null;
    },
    setActiveFeed(state, feedid) {
      for (let i = 0; i < state.currentFeeds.length; i++) {
        if (state.currentFeeds[i].id === feedid) {
          state.activeFeed = state.currentFeeds[i];
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
    },
    deleteAllFeedsSuccess(state, feeds) {
      state.currentFeeds = feeds;
    },
    deleteAllFeedsFailure(state) {
      state.currentFeeds = null;
    },
    editFeedSuccess(state, feeds) {
      state.currentFeeds = feeds;
    },
    editFeedFailure(state) {
      state.currentFeeds = null;
    },
    deleteFeedSuccess(state, feeds) {
      state.currentFeeds = feeds;
    },
    deleteFeedFailure(state) {
      state.currentFeeds = null;
    }
  }
};

export default feeds;