export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail":
                {
                    const emailRegExp = /^\S+@\S+\.\S+$/g;
                    statusValidate = !emailRegExp.test(data);
                }
                break;
            case "isCapitalSymbol":
                {
                    const capitalRegExp = /[A-Z]+/g;
                    statusValidate = !capitalRegExp.test(data);
                }
                break;
            case "isContainDigit":
                {
                    const containDigitRegExp = /\d/g;
                    statusValidate = !containDigitRegExp.test(data);
                }
                break;
            case "min":
                {
                    statusValidate = data.length < config.value;
                }
                break;

            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fildName in data) {
        for (const validateMethod in config[fildName]) {
            const error = validate(
                validateMethod,
                data[fildName],
                config[fildName][validateMethod]
            );
            if (error && !errors[fildName]) {
                errors[fildName] = error;
            }
        }
    }
    return errors;
}
