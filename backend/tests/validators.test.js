const {
    signupSchema,
    loginSchema,
    updateProfileSchema,
    updatePasswordSchema,
    validate
} = require('../src/utils/validators');

describe('Validation Schemas', () => {
    describe('signupSchema', () => {
        it('should validate correct signup data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'Test@123',
                full_name: 'Test User'
            };

            const { error } = signupSchema.validate(validData);
            expect(error).toBeUndefined();
        });

        it('should fail with invalid email', () => {
            const invalidData = {
                email: 'invalid-email',
                password: 'Test@123',
                full_name: 'Test User'
            };

            const { error } = signupSchema.validate(invalidData);
            expect(error).toBeDefined();
        });

        it('should fail with short password', () => {
            const invalidData = {
                email: 'test@example.com',
                password: '123',
                full_name: 'Test User'
            };

            const { error } = signupSchema.validate(invalidData);
            expect(error).toBeDefined();
        });

        it('should fail with short full name', () => {
            const invalidData = {
                email: 'test@example.com',
                password: 'Test@123',
                full_name: 'A'
            };

            const { error } = signupSchema.validate(invalidData);
            expect(error).toBeDefined();
        });
    });

    describe('loginSchema', () => {
        it('should validate correct login data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'Test@123'
            };

            const { error } = loginSchema.validate(validData);
            expect(error).toBeUndefined();
        });

        it('should fail without email', () => {
            const invalidData = {
                password: 'Test@123'
            };

            const { error } = loginSchema.validate(invalidData);
            expect(error).toBeDefined();
        });

        it('should fail without password', () => {
            const invalidData = {
                email: 'test@example.com'
            };

            const { error } = loginSchema.validate(invalidData);
            expect(error).toBeDefined();
        });
    });

    describe('updateProfileSchema', () => {
        it('should validate profile update with full_name', () => {
            const validData = {
                full_name: 'Updated Name'
            };

            const { error } = updateProfileSchema.validate(validData);
            expect(error).toBeUndefined();
        });

        it('should validate profile update with email', () => {
            const validData = {
                email: 'updated@example.com'
            };

            const { error } = updateProfileSchema.validate(validData);
            expect(error).toBeUndefined();
        });

        it('should fail with empty object', () => {
            const invalidData = {};

            const { error } = updateProfileSchema.validate(invalidData);
            expect(error).toBeDefined();
        });
    });

    describe('updatePasswordSchema', () => {
        it('should validate correct password update data', () => {
            const validData = {
                current_password: 'OldPass@123',
                new_password: 'NewPass@123'
            };

            const { error } = updatePasswordSchema.validate(validData);
            expect(error).toBeUndefined();
        });

        it('should fail without current password', () => {
            const invalidData = {
                new_password: 'NewPass@123'
            };

            const { error } = updatePasswordSchema.validate(invalidData);
            expect(error).toBeDefined();
        });

        it('should fail with short new password', () => {
            const invalidData = {
                current_password: 'OldPass@123',
                new_password: '123'
            };

            const { error } = updatePasswordSchema.validate(invalidData);
            expect(error).toBeDefined();
        });
    });

    describe('validate middleware', () => {
        it('should pass validation and call next', () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'Test@123'
                }
            };
            const res = {};
            const next = jest.fn();

            const middleware = validate(loginSchema);
            middleware(req, res, next);

            expect(next).toHaveBeenCalledWith();
        });

        it('should fail validation and call next with error', () => {
            const req = {
                body: {
                    email: 'invalid-email'
                }
            };
            const res = {};
            const next = jest.fn();

            const middleware = validate(loginSchema);
            middleware(req, res, next);

            expect(next).toHaveBeenCalled();
            const error = next.mock.calls[0][0];
            expect(error.isJoi).toBe(true);
        });
    });
});
