import type { Range } from '../types/range.ts';

export function create(start: number, end: number): Range {
  return {
    start,
    end
  };
}

export function clone(range: Range): Range {
  return {...range}
}

export function size(range: Range): number {
  return 1 + Math.abs(range.end - range.start);
}

export function flatten(data: Range[]): Range[] {
  const processed = new Set<Range>();
  for (const range of data) {
    const add = clone(range)

    const duplicates = new Set<Range>();
    for (const entry of processed) {
      if (add.start >= entry.start && add.start <= entry.end || 
          add.end >= entry.start && add.end <= entry.end || 
          entry.start < add.start && entry.end > add.end || 
          add.start < entry.start && add.end > entry.end) {
        add.start = (add.start < entry.start) ? add.start : entry.start;
        add.end = (add.end > entry.end) ? add.end : entry.end;
        duplicates.add(entry);
      }
    }

    for (const duplicate of duplicates) {
      processed.delete(duplicate);
    }
    
    processed.add(add);
  }

  return Array.from(processed);
}