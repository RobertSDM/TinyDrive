import { Link } from "react-router-dom";
import { useTreeContext } from "../../../../context/useContext.tsx";

export default () => {
    const { tray } = useTreeContext();

    return (
        <div className="tray">
            {tray.map((item, index) => {
                return (
                    <Link
                        className={`${
                            item.link != "" &&
                            "hover:bg-purple-200 p-1 hover:rounded-md"
                        }`}
                        key={index}
                        to={item.link}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
};
