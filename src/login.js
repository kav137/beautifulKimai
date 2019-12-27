const baseUrl = 'testUrl';

const sendRequest = async (path = 'activities') => {
	const fullPath = baseUrl + path;
	const reuqestOptions = {
		method: 'GET',
		headers: {
			'X-AUTH-USER': 'testUser',
			'X-AUTH-TOKEN': 'testToken'
		}
	}
	const result = await fetch(fullPath, reuqestOptions);
	const resultJson = await result.json();

	return resultJson;
};

const sendApiRequest = async () => {
	const result = await sendRequest();

	return result;
};

export default sendApiRequest;