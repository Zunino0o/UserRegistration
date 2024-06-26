import db from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../utils/logger.js';
import QUERY from '../query/user.query.js';
import HttpStatus from '../utils/httpStatus.js';

export const getUserByEmail = (req, res) => {
  const { email } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, fetching user by email.`);
  db.query(QUERY.GET_USER_BY_EMAIL, `${email}`, (err, result) => {
    if (!result || result.length === 0) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'Email not found'
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'User fetched successfully',
            result[0]
          )
        );
    }
  });
};
