import express, { Express, ErrorRequestHandler } from "express";
import taskStaticRoutes from "./routes/taskStatic.routes";
import taskDynamicRoutes from "./routes/taskDynamic.routes";
import teamRoutes from "./routes/team.routes";
import { checkJwt } from "./middleware/authz.middleware";

const app: Express = express();
// Auth
app.use(checkJwt);
app.use(((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
    }
}) as ErrorRequestHandler);

/** Logging */
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
    );
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.use("/taskStatic", taskStaticRoutes.router);
app.use("/taskDynamic", taskDynamicRoutes.router);
app.use("/team", teamRoutes.router);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});

export { app };
