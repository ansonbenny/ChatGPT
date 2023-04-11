import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import loading from "./loading";
import history from "./history";
import messages from "./messages";

export const store = configureStore({
    reducer: {
        user,
        loading,
        history,
        messages
    }
})