const musicController = {};

musicController.getBookSubjects = (req, res, next) => {
  try {
    const { bookTitle, bookAuthor } = req.body;
  } catch (err) {
    return next({
      log: 'an error occurred in the getBookSubjects middleware',
      message: { err: err },
    });
  }
};

musicController.getSpotifyRecs = (req, res, next) => {
  try {
  } catch (err) {
    return next({
      log: 'an error occurred in the getSpotifyRecs middleware',
      message: { err: err },
    });
  }
};

module.exports = musicController;
