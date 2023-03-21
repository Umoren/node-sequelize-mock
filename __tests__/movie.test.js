const SequelizeMock = require("sequelize-mock");
const { createMovie, getAllMovies } = require("../controllers/movieController");

describe("movie controller", () => {
  let sequelizeMock;
  let Movie;

  beforeAll(() => {
    sequelizeMock = new SequelizeMock();
    Movie = sequelizeMock.define("Movie", {
      title: "The Matrix",
      releaseDate: "1999-03-31",
      duration: 136,
    });
  });

  describe("createMovie", () => {
    it("should create a new movie", async () => {
      const movie = {
        title: "The Matrix",
        releaseDate: "1999-03-31",
        duration: 136,
      };
      Movie.$queueResult(Movie.build(movie));
      const response = await createMovie({ body: movie });
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(movie.title);
      expect(response.body.releaseDate).toBe(movie.releaseDate);
      expect(response.body.duration).toBe(movie.duration);
    });

    it("should return 400 if request body is invalid", async () => {
      const movie = { title: "The Matrix", duration: 136 };
      const response = await createMovie({ body: movie });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("getAllMovies", () => {
    it("should return all movies", async () => {
      const movies = [
        { title: "The Matrix", releaseDate: "1999-03-31", duration: 136 },
        { title: "Inception", releaseDate: "2010-07-16", duration: 148 },
      ];
      Movie.$queueResult(movies.map((movie) => Movie.build(movie)));
      const response = await getAllMovies();
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(movies.length);
      expect(response.body[0].title).toBe(movies[0].title);
      expect(response.body[1].title).toBe(movies[1].title);
    });
  });
});
