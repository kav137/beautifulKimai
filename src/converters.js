export default {
  date: {
    toView(originDateString) {
      return originDateString.split("T")[0];
    },
    toSrc(userViewString) {
      const date = new Date(userViewString);
      return date.toISOString();
    }
  },
  duration: {
    toView(originDateString) {
      return originDateString / 60 / 60;
    },
    toSrc(userViewString) {
      return userViewString * 60 * 60;
    }
  }
};
