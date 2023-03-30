import { Router } from "express";
let router = Router()

router.get('/', (req, res) => {
    res.send("User Route")
})

export default router