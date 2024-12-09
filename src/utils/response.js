/**
 * Standard success response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Any additional data to send
 * @returns {object} JSON response
 */
export const successResponse = (statusCode, message, data = {}) => {
    return {
      status: statusCode,
      success: true,
      message,
      data,
    };
  };
  
  /**
   * Standard error response
   * @param {number} statusCode - HTTP status code
   * @param {string} errorMessage - The main error message
   * @param {string} errorCode - An optional specific error code
   * @param {object} errorDetails - Any additional error context details
   * @returns {object} JSON response
   */
  export const errorResponse = (statusCode, errorMessage, errorCode = null, errorDetails = {}) => {
    return {
      status: statusCode,
      success: false,
      error: {
        errorMessage,
        errorCode,
        errorDetails,
      },
    };
  };
  