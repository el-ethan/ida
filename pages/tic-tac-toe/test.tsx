import { checkWinner } from '.';

describe('checkWinner', () => {
    it('should return true when a winning pattern is matched', () => {
        expect(checkWinner([0, 1, 2])).toBe(true);
    });

    it('should return false when a winning pattern is not matched', () => {
        expect(checkWinner([0, 1, 4])).toBe(false);
    });

    it('should return false when a winning pattern is only partially matched', () => {
        expect(checkWinner([0, 1])).toBe(false);
    });

    it('should return true when a winning pattern is eventually matched', () => {
        expect(checkWinner([0, 1, 4, 2])).toBe(true);
    });

    it('should return true regardless of order of winning pattern', () => {
        expect(checkWinner([2, 0, 1])).toBe(true);
    });
});
