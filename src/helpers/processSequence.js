/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { compose, lt, prop, tap, gt, test, allPass, when, complement, andThen, curry, __, length } from 'ramda';

const api = new Api();

const getValue = prop('value');
const getHandleError = prop('handleError');
const getResult = prop('result');
const getWriteLog = prop('writeLog');
const getHandleSuccess = prop('handleSuccess');

const isLessThenTen = gt(10);
const isGreaterThenTwo = lt(2);
const isNumber = test(/^[0-9]+\.{0,1}[0-9]+$/);
const isValueLengthValid = compose(
    allPass([
        isLessThenTen,
        isGreaterThenTwo
    ]),
    length,
)
const isValueValid = compose(
    allPass([
        isValueLengthValid,
        isNumber,
    ]),
    getValue
)

const isValueNotValid = complement(isValueValid)

const parseIntFromValue = compose(
    Math.round,
    parseFloat,
    getValue
)

const getTech = api.get('https://api.tech/numbers/base')
const getBinaryValue = (value) => getTech({from: 10, to: 2, number: value})

const getAnimalById = (id) => api.get(`https://animals.tech/${id}`)({})

const logError = (data) => getHandleError(data)('ValidationError')

const square = curry(Math.pow)(__, 2)
const threeDelimeter = (value) => value % 3

const processSequence = (data) => {

    const writeLog = getWriteLog(data)
    const handleSuccess = getHandleSuccess(data)

    const logValue = compose(
        writeLog,
        getValue
    )

    const result = compose(
        when(
            isValueValid,
            compose(
                andThen(handleSuccess),
                andThen(getResult),
                andThen(getAnimalById),
                andThen(tap(writeLog)),
                andThen(threeDelimeter),
                andThen(tap(writeLog)),
                andThen(square),
                andThen(tap(writeLog)),
                andThen(length),
                andThen(tap(writeLog)),
                andThen(getResult),
                getBinaryValue,
                tap(writeLog),
                parseIntFromValue,
            )
        ),
        when(
            isValueNotValid,
            tap(logError)
        ),
        tap(logValue)
    )

    result(data)
}

export default processSequence;
