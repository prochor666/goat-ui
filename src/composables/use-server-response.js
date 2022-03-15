export const serverResponse = function () {

    const parse = function (data) {

        const validated = {}

        for (let i in data) {

            validated[i] = !(data[i] === false);
        }

        return validated;
    };


    return {
        parse,
    }
}

export default serverResponse;
