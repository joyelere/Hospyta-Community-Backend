import express, { Request, Response, NextFunction } from "express";
import postsRoutes from "./routes/posts";
import usersRoutes from "./routes/users";
import commentsRoutes from "./routes/comments";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

// Middleware
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO,
    }),
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

export default app;
