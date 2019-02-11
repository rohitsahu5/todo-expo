import store from "./store/index";
import { getTasks } from "./actions/index";
window.store = store;
window.getTasks = getTasks;
