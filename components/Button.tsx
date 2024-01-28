import {ButtonProp} from "@/interfaces";

const Button = ({title, style, type, action, disable}: ButtonProp ) => {

    return (
        <div>
            <button
                type={type}
                onClick={action}
                onChange={action}
                disabled={disable}
                className={`${style} font-bold rounded-[10px] text-[30px] px-3 active:bg-transparent`}
            >
                {title}
            </button>
        </div>
    );
}
export default Button