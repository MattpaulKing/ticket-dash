import { max, parse } from 'date-fns'

export const getDistinct = (items: string[]) => {
	return Array.from(new Set(items));
}

export const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);

export const mean = (nums: number[]) => (nums.length === 0 ? 0 : sum(nums) / nums.length);

export const latest = (values: string[] | Date[]) => max(values.map( (value) => parse(value, 'yyyy-mm-d', new Date()))).toDateString()
