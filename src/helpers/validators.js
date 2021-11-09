/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { equals, prop, compose, allPass, gt, filter, complement, lt, anyPass } from "ramda";

// геттеры
const getStar = prop('star')
const getSquare = prop('square')
const getTriangle = prop('triangle')
const getCircle = prop('circle')
const getLength = prop('length')

const getAllColors = (colorsObject) => Object.values(colorsObject)

// Предикаты
const isWhite = equals('white');
const isGreen = equals('green');
const isRed = equals('red');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isNotWhite = complement(isWhite);
const isNotRed = complement(isRed);

const isRedStar = compose(
    isRed,
    getStar
)

const isNotRedStar = compose(
    isNotRed,
    getStar
)

const isNotWhiteStar = compose(
    isNotWhite,
    getStar
)

const isGreenSquare = compose(
    isGreen,
    getSquare
)

const isOrangeSquare = compose(
    isOrange,
    getSquare
)

const isNotWhiteSquare = compose(
    isNotWhite,
    getSquare
)

const isWhiteTriangle = compose(
    isWhite,
    getTriangle
)

const isNotWhiteTriangle = compose(
    isNotWhite,
    getTriangle
)

const isGreenTriangle = compose(
    isGreen,
    getTriangle
)

const isWhiteCircle = compose(
    isWhite,
    getCircle
)

const isBlueCircle = compose(
    isBlue,
    getCircle
)



const isWhiteTriangleAndCircle = allPass([isWhiteTriangle, isWhiteCircle])

const isGreateThenOne = (number) => gt(number, 1)
const isGreaterThenTwo = (number) => gt(number, 2)

const isLessThenTwo = (number) => lt(number, 2)

const isEqualFour = equals(4)
const isEqualOne = equals(1)
const isEqualTwo = equals(2)

//вспомогательные функции

const countColor = (filterFunc) => compose(
    getLength,
    filter(filterFunc),
    getAllColors
)

const countGreen = countColor(isGreen)
const countOrange = countColor(isOrange)
const countBlue = countColor(isBlue)
const countRed = countColor(isRed)
const countWhite = countColor(isWhite)

const isOneRedFigure = compose(
    isEqualOne,
    countRed
)

const isTwoGreenFigures = compose(
    isEqualTwo,
    countGreen
)

const isWhiteLessThenTwo = compose(
    isLessThenTwo,
    countWhite
)

const isGreenGreaterThenThree = compose(
    isGreaterThenTwo,
    countGreen
)

const isRedGreaterThenThree = compose(
    isGreaterThenTwo,
    countRed
)

const isBlueGreaterThenThree = compose(
    isGreaterThenTwo,
    countBlue
)

const isOrangeGreaterThenThree = compose(
    isGreaterThenTwo,
    countOrange
)

const isAnyColorBesideWhiteGreaterThenTwo = anyPass([
    isGreenGreaterThenThree,
    isRedGreaterThenThree,
    isBlueGreaterThenThree,
    isOrangeGreaterThenThree
])

const isTriangleColorEualSquareColor = (colorsObject) => equals(getTriangle(colorsObject), getSquare(colorsObject))

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangleAndCircle])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    isGreateThenOne,
    countGreen
)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (colorsObject) => equals(countBlue(colorsObject), countRed(colorsObject))

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = allPass([
    isWhiteLessThenTwo,
    isAnyColorBesideWhiteGreaterThenTwo
])

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    isGreenTriangle,
    isTwoGreenFigures,
    isOneRedFigure
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    isEqualFour,
    countOrange
)

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    isEqualFour,
    countGreen
)
// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([isNotWhiteTriangle, isNotWhiteSquare, isTriangleColorEualSquareColor])
