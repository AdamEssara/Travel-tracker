import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "adam",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Middleware to fetch visited countries
 */
async function fetchVisitedCountries(req, res, next) {
  try {
    const visited = await db.query("SELECT country_code FROM visited_countries");

    // Store the result in req for use in the next handler
    req.countries = visited.rows.map(row => row.country_code);

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Function to add a country to visited_countries
 */
async function add(req, res) {
  try {
    const name = req.body["country"];
    
    // Check if the country exists in the 'countries' table
    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [name]);

    if (result.rows.length !== 0) {  // ✅ Correct way to check if data exists
      const code = result.rows[0].country_code; // ✅ Fix variable name
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [code]);
    }

    res.redirect("/"); // ✅ Move redirection inside the function
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Route to render the homepage
 */
app.get("/", fetchVisitedCountries, (req, res) => {
  res.render("index.ejs", { countries: req.countries, total: req.countries.length });
});

/**
 * Route to handle adding a country
 */
app.post("/add", add);  // ✅ Fix incorrect function call

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
