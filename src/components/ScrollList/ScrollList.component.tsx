import classes from "./ScrollList.module.css";

interface IScrollList {
    data: string[] | undefined;
};


const ScrollList = (props: IScrollList) => {

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

    return (
        <>{render()}</>
    );
};

export default ScrollList;
