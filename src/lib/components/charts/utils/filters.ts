export function intersection(o1: object, o2: object) {
    return Object.keys(o1).filter({}.hasOwnProperty.bind(o2));
}
