import FeedService from '../services/feed.service'

const initialState = () => {
  return {
    currentFeeds: [],
    activeFeed: {},
    currentFeedItems: [],
    activeFeedItem: {}
  }
};

const feeds = {
  namespaced: true,
  state: initialState(),
  actions: {
    getFeeds({ commit }, userid) {
      return FeedService.getFeeds(userid).then(
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
    setActiveFeed({ commit }, feedid) {
      commit('setActiveFeed', feedid);
      return Promise.resolve(feedid);
    },
    setActiveFeedItem({ commit }, feeditemid) {
      commit('setActiveFeedItem', feeditemid);
      return Promise.resolve(feeditemid);
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
    },
    logout({ commit }) {
      commit('resetState')
    }
  },
  mutations: {
    getFeedsSuccess(state, feeds) {
      state.currentFeeds = feeds;
      state.activeFeed = feeds[0];
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
    setActiveFeedItem(state, feeditemid) {
      for (let i = 0; i < state.currentFeedItems.length; i++) {
        if (state.currentFeedItems[i].id === feeditemid) {
          state.activeFeedItem = state.currentFeedItems[i];
        }
      }
    },
    getFeedItemsSuccess(state, items) {
      state.currentFeedItems = items;
      state.activeFeedItem = items[0];
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
    },
    resetState(state) {
      Object.assign(state, initialState())
    }
  }
};

export default feeds;