const { authenticate, requireAdmin } = require('../src/middleware/auth');

describe('Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
            user: null
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('authenticate middleware', () => {
        it('should fail without authorization header', async () => {
            await authenticate(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'No token provided'
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with invalid Bearer format', async () => {
            req.headers.authorization = 'Invalid token';

            await authenticate(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'No token provided'
            });
        });
    });

    describe('requireAdmin middleware', () => {
        it('should fail if user is not authenticated', () => {
            requireAdmin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Authentication required'
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail if user is not an admin', () => {
            req.user = { role: 'user' };

            requireAdmin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Admin access required'
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should pass if user is an admin', () => {
            req.user = { role: 'admin' };

            requireAdmin(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });
    });
});
