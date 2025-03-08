"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = async (req, res) => {
    try {
        const dummyUser = {
            email: "dummy@example.com",
            number: "1234567890",
            name: "Dummy User"
        };
        res.status(201).json(dummyUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map