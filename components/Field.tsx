import {FieldProp} from "@/interfaces";

 const Field = (
    {
        type,
        name,
        value,
        actionOnchange,
        actionOnclik,
        pattern,
        placeholder,
        style,
        icon,
        maxLength,
        minLength
    }: FieldProp
) => {
    return (
        <div className={'flex space-x-0 bg-btnbg rounded-[10px] pr-3 '}>
            <input
            type={type}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            value={value}
            onChange={actionOnchange}
            onClick={actionOnclik}
            pattern={pattern}
            placeholder={placeholder}
            className={`${style} border-hidden outline-none border focus:border-0 focus:border-hidden  bg-btnbg rounded-[10px] pl-5 text-white text-[25px] ` }

            />
            <span className={'mt-3'}>{icon}</span>

        </div>
    );
}
export default Field