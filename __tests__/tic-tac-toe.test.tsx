import { checkWinner, findMoveForRobot } from '../pages/tic-tac-toe';

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

describe('findMoveForRobot', () => {
    it('should return null if there is no "best choice"', () => {
        expect(findMoveForRobot([1], [])).toBeNull();
    });

    it('should return null if the "best choice" is already taken by robot', () => {
        expect(findMoveForRobot([0, 1], [2])).toBeNull();
    });

    it('should return the "best choice" if player is one move away', () => {
        expect(findMoveForRobot([0, 4], [3])).toBe(8);
    });

    it('should return the "best choice" even when player choices are not in order', () => {
        expect(findMoveForRobot([0, 8], [3])).toBe(4);
    });

    it('should return the "best choice" if the first two moves are 2, 1', () => {
        expect(findMoveForRobot([2, 1], [3])).toBe(0);
    });
});
