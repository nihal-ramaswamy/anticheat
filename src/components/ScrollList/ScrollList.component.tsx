import classes from "./ScrollList.module.css";

interface IScrollList {
    data: string[] | undefined;
};


const ScrollList = (props: IScrollList) => {
    return (
        <div className={classes.Scroll}>
            {props.data.map((li, idx) => {
                return (
                    <div className={classes.Card}>
                    <li className={classes.List} key={idx}>{li}</li>
                    </div>
                )
            })}
        </div>
    );
};

export default ScrollList;
