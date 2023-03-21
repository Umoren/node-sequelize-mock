const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../dev.sqlite",
});

const Movie = require("../models/movie")(sequelize, Sequelize);
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findByPk(id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const [rowsUpdated, [updatedMovie]] = await Movie.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.json(updatedMovie);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Movie.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.json({ message: "Movie deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
