/**
 * Enum for HttpMethods.
 * @readonly
 * @enum {string}
 */
export const HttpMethods = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
})

export const Rubbles = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export let Timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

export const slugify = str =>
  str.toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const upperify = str =>
    str.toUpperCase()
      .trim()
      .replace(/&/g, '-and-')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s--]+/g, '_')
      .replace(/^-+|-+$|^_+|_+$/g, '')
