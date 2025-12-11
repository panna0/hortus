import style from "./NeutralTitle.module.scss";

const NeutralTitle = ({ children }) => {
    return (
        <div className={style.titleContainer}> 
          {children}
        </div>
    );
}

export default NeutralTitle;