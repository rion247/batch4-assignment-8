import express from "express";

const router = express.Router();

const moduleRoutes = [{ path: "", route: "" }];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
