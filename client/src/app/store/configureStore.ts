import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../features/contact/counterSlice";

// export function configureStore() { //regular redux
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

// this below is optional, makes it easier to use redux and no to have to use useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// with this we call redux like this:


// without it we call redux like this:
// const { data, title } = useSelector((state: CounterState) => state);
// const dispatch = useDispatch();

// onClick={()=> dispatch(decrement())}

