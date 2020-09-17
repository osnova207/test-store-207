import { combineReducers} from "redux";
import users from "./users";
import products from "./products";
import properties from "./properties";

export default combineReducers({
    users,
    products,
    properties,
})
