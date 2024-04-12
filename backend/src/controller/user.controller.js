const db = require('../config/mysql.config.js');
const Response = require('../utils/response.js');
const logger = require('../utils/logger.js');
const QUERY = require('../query/user.query.js');
const HttpStatus = require('../utils/httpStatus.js');

export const getUsers = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching users.`);
  db.query(QUERY.GET_USERS, (err, result) => {
    if (!result || result.length === 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'No users found'
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'users fetched successfully',
            { users: result }
          )
        );
    }
  });
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, fetching user by ID.`);
  db.query(QUERY.GET_USER_BY_ID, [id], (err, result) => {
    if (!result || result.length === 0) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'user not found',
            null
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'user fetched successfully',
            result[0]
          )
        );
    }
  });
};

export const createUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating users.`);
  db.query(
    QUERY.CREATE_USER_PROCEDURE,
    Object.values(req.body),
    (err, result) => {
      if (!result) {
        logger.error(`Error creating user: ${err.message}`);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              'Error creating user'
            )
          );
      } else {
        // const USER = {
        //   id: result.insertId,
        //   ...req.body,
        //   created_at: new Date(),
        // };
        const user = result[0][0];
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              'User created successfully',
              { user }
            )
          );
      }
    }
  );
};

export const updateUser = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, fetching user.`);
  db.query(QUERY.GET_USER_BY_ID, [id], (err, result) => {
    if (!result[0]) {
      logger.error(`Error fetching user: ${err.message}`);
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'user not found'
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating user.`);
      db.query(
        QUERY.UPDATE_USER,
        [...Object.values(req.body), id],
        (err, result) => {
          if (!err) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  'user updated successfully',
                  { id, ...req.body }
                )
              );
          } else {
            logger.error(`Error updating user: ${err.message}`);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  'Error updating user'
                )
              );
          }
        }
      );
    }
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, deleting user.`);
  db.query(QUERY.DELETE_USER, [id], (err, result) => {
    if (result.affectedRows === 0) {
      logger.error(`Error deleting user`);
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'Error deleting user'
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'user deleted successfully'
          )
        );
    }
  });
};
