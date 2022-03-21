import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../store/action-creators";

export const useActions = () => {
    return bindActionCreators(actionCreators, useDispatch())
} 