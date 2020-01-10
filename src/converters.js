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
      const time = parseInt(originDateString, 10);
      const hours = Math.floor(time / 60 / 60);
      const minutes = (time - hours * 60 * 60) / 60;

      return `${hours}:${minutes}`;
    },
    toSrc(hours, minutes) {
      const hoursTime = parseInt(hours, 10) * 60 * 60;
      const minutesTime = parseInt(minutes, 10) * 60;
      return hoursTime + minutesTime;
    }
  }
};
