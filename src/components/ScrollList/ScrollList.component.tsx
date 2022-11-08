import classes from "./ScrollList.module.css";
import { signOutOfSession } from "../../db/auth.db";
import { setUser } from "../../features/auth/auth.slice";
import { useDispatch } from "react-redux";

interface IScrollList {
    data: string[] | undefined;
};


const ScrollList = (props: IScrollList) => {

    const dispatch = useDispatch();

    const render = () => {
        if (props.data === undefined) {
            return <></>;
        } else {
            return (
                <div className={classes.Scroll}>
                    {props.data.map((li, idx) => {
                        return (
                            <div className={classes.Card} key={idx}>
                                <li className={classes.List} key={idx}>{li}</li>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    const handleSubmit = () => {
        signOutOfSession();
        dispatch(setUser("")); // Reset user to nothing
    }

    return (
        <>
            {render()}
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                onClick={() => handleSubmit()}
            >Log Out</button>
        </>
    );
};

export default ScrollList;
