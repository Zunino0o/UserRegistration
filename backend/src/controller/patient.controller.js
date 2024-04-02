import db from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../utils/logger.js';
import QUERY from '../query/patient.query.js';
import HttpStatus from '../utils/httpStatus.js';

export const getPatients = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching patients.`);
  db.query(QUERY.GET_PATIENTS, (err, result) => {
    if (!result) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'No patients found'
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'Patients fetched successfully',
            { patients: result }
          )
        );
    }
  });
};

export const getPatientById = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, fetching patient by ID.`);
  db.query(QUERY.GET_PATIENT_BY_ID, [id], (err, result) => {
    if (!result || result.length === 0) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'Patient not found',
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
            'Patient fetched successfully',
            result[0]
          )
        );
    }
  });
};

export const createPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating patients.`);
  db.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(req.body), (err, result) => {
    if (!result) {
      logger.error(`Error creating patient: ${err.message}`);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(
          new Response(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            'Error creating patient'
          )
        );
    } else {
      // const patient = {
      //   id: result.insertId,
      //   ...req.body,
      //   created_at: new Date(),
      // };
      const patient = result[0][0];
      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            'Patient created successfully',
            { patient }
          )
        );
    }
  });
};

export const updatePatient = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, fetching patient.`);
  db.query(QUERY.GET_PATIENT_BY_ID, [id], (err, result) => {
    if (!result[0]) {
      logger.error(`Error fetching patient: ${err.message}`);
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'Patient not found'
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating patient.`);
      db.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), id],
        (err, result) => {
          if (!err) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  'Patient updated successfully',
                  { id, ...req.body }
                )
              );
          } else {
            logger.error(`Error updating patient: ${err.message}`);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  'Error updating patient'
                )
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, deleting patient.`);
  db.query(QUERY.DELETE_PATIENT, [id], (err, result) => {
    if (result.affectedRows === 0) {
      logger.error(`Error deleting patient`);
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            'Error deleting patient'
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'Patient deleted successfully'
          )
        );
    }
  });
};

// export const getPatientByEmail = (req, res) => {
//   const { email } = req.params;
//   console.log(email)

//   logger.info(`${req.method} ${req.originalUrl}, fetching patient by email.`);
//   db.query(QUERY.GET_PATIENT_BY_EMAIL, `${email}`, (err, result) => {
//     if (!result || result.length === 0) {
//       res
//         .status(HttpStatus.NOT_FOUND.code)
//         .send(
//           new Response(
//             HttpStatus.NOT_FOUND.code,
//             HttpStatus.NOT_FOUND.status,
//             'Email not found'
//           )
//         );
//     } else {
//       res
//         .status(HttpStatus.OK.code)
//         .send(
//           new Response(
//             HttpStatus.OK.code,
//             HttpStatus.OK.status,
//             'Patient fetched successfully',
//             result[0]
//           )
//         );
//     }
//   });
// }