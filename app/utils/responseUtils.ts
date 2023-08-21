export function createErrorResponse(statusCode, errorMessage) {
    return {
      status: statusCode,
      body: JSON.stringify({
        error: errorMessage,
      }),
    };
  }
  
  export function createSuccessResponse(statusCode) {
    return {
      status: statusCode,
      body: JSON.stringify({
        success: true,
      }),
    };
  }