export const success = (res, status, message, data = null) => {
	return res.status(status).json({
		success: true,
		message,
		data,
	});
};

export const error = (res, status, message, details = null) => {
	return res.status(status).json({
		success: false,
		message,
		details,
	});
};
