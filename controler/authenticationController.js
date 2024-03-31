const teacherSchema=require("./../Model/TeacherModel")
const jwt = require("jsonwebtoken");
/**
 * @swagger
paths:
  /login:
    post:
      summary: Log in to the system
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                fullName:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  teacher:
                    $ref: '#/components/schemas/Teacher'
                  token:
                    type: string
        '401':
          description: Unauthorized
components:
  schemas:
    Teacher:
      type: object
      properties:
        _id:
          type: string
        fullName:
          type: string
        email:
          type: string
        image:
          type: string
*/
exports.login = (req, res, next) => {
    teacherSchema.findOne({
    fullName: req.body.fullName,
    password: req.body.password,
  })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Not Authenticated");
      }
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(
        {
          _id:teacher._id,
          role: "admin",
        },
        secretKey,
        { expiresIn: "1hr" }
      );
      res.json({ teacher, token });
    })
    .catch((error) => next(error));
};
